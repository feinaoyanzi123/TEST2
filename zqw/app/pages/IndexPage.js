import React, {
  Component
} from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  AsyncStorage,
  ToastAndroid,
  Alert,
  TouchableHighlight,
  BackHandler,
  Platform,
  NetInfo
} from 'react-native';
import {
  createStackNavigator
} from 'react-navigation';

import Banner from '../components/Banner'
import Lists from '../components/Lists'
import Auth from '../components/Auth'
import ShareShow from '../components/ShareShow'
import Replace from '../components/Replace'

import {
  connect
} from 'react-redux'; // 引入connect函数
import * as commonAction from '../actions/commonAction';
import * as loginAction from '../actions/loginAction';
import Toast, {
  DURATION
} from 'react-native-easy-toast';
import DeviceInfo from 'react-native-device-info';
import resolveAssetSource from 'resolveAssetSource';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      shareshow: null,
      modalRef: null,
      isConnected: null
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      header: null,
    };
  }

  componentDidMount() {
    //检测网络是否连接
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected) {
        AsyncStorage.getItem('autologin', (error, val) => {
          if (val !== null) {
            AsyncStorage.getItem('loginToken', (error, token) => {
              if (token !== null) {
                this.refs.toast.show("自动登录成功");
                this.props.dispatch(loginAction.setToken(token));
              }
            })
          }
        })
        this.fetchData();
      } else {
        this.refs.toast.show("自动登录失败");
      }
    });
  }

  toNum = (num) => {
    let res = num.toString();
    res = res.split('.');
    res = res.join('');
    return res;
  }

  fetchData() {
    let version = DeviceInfo.getVersion();
    fetch("http://xuanche.17350.com/api/version/app", {
        method: 'GET',
        headers: {
          'contentType': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        let modalVisible = false;
        let xb = this.toNum(responseData.info.version);
        let jb = this.toNum(version);
        if ( xb > jb) {
          let set = {};
          modalVisible = true;
          if (Platform.OS === 'ios') {
            set['version'] = responseData.info.version;
            set['url'] = responseData.info.ios;
            set['modalVisible'] = modalVisible;
          } else {
            set['version'] = responseData.info.version;
            set['url'] = responseData.info.android;
            set['modalVisible'] = modalVisible;
          }
          this.props.dispatch(commonAction.setReplace(set))
          this.refs.replace.setReplace(set);
        }
      })
      .catch((error) => {})
      .done();
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  lastBackPressed = 0
  onBackAndroid = () => {
    let {
      navigation
    } = this.props;
    if (navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return false
      }
      this.lastBackPressed = Date.now(); //按第一次的时候，记录时间
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT); //显示提示信息
      return true;
    } else {
      return false;
    }
  }

  callBack = (call) => {
    this.setState({
      shareshow: call
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <Replace
           ref="replace"
          />
          <Toast 
            ref="toast"
            position='top'
            positionValue={SCREEN_HEIGHT*0.3}
          />
          <Banner 
            style={styles.banner}
            navigate={this.props.navigation.navigate} 
            dispatch={this.props.dispatch}
            commonAction={commonAction}
          >
          </Banner>
          <Auth 
            navigate={this.props.navigation.navigate}
            token={this.props.token}
          >
          </Auth>
          <TouchableHighlight 
            onPress={() => {this.state.shareshow.closeModal(true)}} 
            underlayColor='rgba(255, 255, 255, 0)' 
            style={{position:'absolute',left:10,top:30,}}
          >
            <View style={{backgroundColor:'rgba(0,0,0,0)',}}>
              <Image
                style={{width:30, height:30,}}
                source={Images.fxlogo}
              />
            </View>
          </TouchableHighlight>
          <ShareShow
            show={this.state.show}
            callBack={this.callBack.bind(this)}
            title="专汽宝"
            description="最新款专汽宝典，包括汽车公告、汽车报价、评测资料等工具，是您销售专用车的最佳工具!"
            webpageUrl="http://www.17350.com/api.php?op=share&from=singlemessage"
            thumbImage={resolveAssetSource(Images.logo).uri}
          >
          </ShareShow>
          <Lists 
            style={styles.lists} 
            navigate={this.props.navigation.navigate}
            token={this.props.token}
          >
          </Lists>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  banner: {
    height: SCREEN_WIDTH * 0.65,
  },
  lists: {
    height: SCREEN_HEIGHT - SCREEN_WIDTH * 0.65,
  }
});

export default connect(
  (state) => ({
    token: state.login.token
  })
)(Index)