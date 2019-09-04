import React, { Component } from 'react';
import { 
	WebView, 
	Animated, 
	Easing, 
	View, 
	Image, 
	Text, 
	ProgressBarAndroid, 
	AppRegistry, 
	StyleSheet, 
	TouchableHighlight,
	Platform,
	BackHandler,
  StatusBar
} from 'react-native';
import ShareShow from '../components/ShareShow';

class PingceView extends Component {
  constructor(props:any) {
    super(props);
    this.nav = this.props.navigation;//导航
    // 添加返回键监听(对Android原生返回键的处理)
    this.addBackAndroidListener(this.nav);
    this.state = {
      show:false,
      shareshow:null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '评测',
      headerStyle: {
        backgroundColor: '#27232b',
        height:(45+Bar),
        paddingTop:Bar,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
      },
      headerRight: (
        <TouchableHighlight 
          onPress={() => {navigation.state.params.navigatePress(true)}} 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{marginRight:20}}
        >
          <Image source={Images.nav_share} style={{width:25,height:25}}/>
        </TouchableHighlight>
      ),
    };
  }

  onBackAndroid = () => {
    //官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      return true;
    } else {
      this.nav.goBack();
      // if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
      //     //最近1秒内按过back键，可以退出应用。
      //     return false;
      // }
        //this.lastBackPressed = Date.now();
        // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  };

  componentDidMount () {
    this.props.navigation.setParams({navigatePress:this.share});
  }

  // 监听原生返回键事件
  addBackAndroidListener(navigator) {
    if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  //组件销毁结束监听
  componentWillUnmount(){
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  share = ()=>{
    this.state.shareshow.closeModal(true)
  }

  callBack = (call) =>{
    this.setState({
      shareshow:call
    })
  }

  render() {
    var desc = this.props.navigation.state.params.desc;
    desc = desc.substr(0, 100);
    return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
      <ShareShow
        show={this.state.show}
        callBack={this.callBack.bind(this)}
        title={this.props.navigation.state.params.title}
        description={desc}
        webpageUrl={this.props.navigation.state.params.url}
        thumbImage={this.props.navigation.state.params.thumb}
      >
      </ShareShow>
      <WebView
        ref={(WebView)=>{ _webview = WebView }}
        startInLoadingState={true}
        source={{uri: this.props.navigation.state.params.url}}
        renderLoading={(prop)=>{
        	return (
  		      <View style={styles.container}>
  		        <ProgressBarAndroid indeterminate={true} color="#2196F3"/>
  		      </View>
		      )}
        }
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bottomMenu: {
  	height: 50, 
    width: SCREEN_WIDTH, 
    backgroundColor:'#333',
    flexDirection:'row', 
    position: 'relative', 
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
  },
  bottomClick:{
    flex:1,
    justifyContent: 'center', 
    alignItems:'center',
  },
  image:{
  	height:18,
    width:10,
    marginTop:3,
    marginBottom:3,
  },
  bottomImage:{
    height:24,
    width:24,
  },
  bottomText:{
    color:'#fff',
  }
});


export default PingceView;