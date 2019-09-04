import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Image,
  TouchableHighlight,
  Switch,
  NetInfo
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数
import *as loginAction from '../../actions/loginAction'
import Toast, {DURATION} from 'react-native-easy-toast'

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      switch:false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "设置",
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
        <View/>
      ),
    };
  }

  componentDidMount(){
  }

  //组件销毁结束监听
  componentWillUnmount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Toast 
          ref="toast"
          position='top'
          positionValue={SCREEN_HEIGHT*0.3}
        />
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('minfo') }} 
          underlayColor='transparent'
        >
          <View style={styles.content}>
            <Text style={styles.lable}>账号与安全</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('help') }} 
          underlayColor='transparent'
        >
          <View style={[styles.content,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>功能介绍与帮助</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => {this.props.navigation.navigate('about')} } 
          underlayColor='transparent'
        >
          <View style={[styles.content,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>关于专汽宝</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
        <View style={[styles.content,{marginTop:50}]}>
            <Text style={styles.lable}>新消息通知</Text>
            <Switch
              onValueChange={()=>{this.setState({switch:!this.state.switch})}}
              value={this.state.switch}
            />
          </View>
        <Text style={styles.btu} onPress={()=>{ this._logout() }} >退出登录</Text>
      </View>
    )
  }

  _logout(){
    NetInfo.isConnected.fetch().done((isConnected) => {
      if(isConnected){
        let token = '';
        this.props.dispatch(loginAction.setToken(token));
        this.props.navigation.navigate('Index');
        this.refs.toast.show("退出成功");
      }else{
        this.refs.toast.show("网络连接失败");
      }
    })
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f2f2f2'
  },
  content:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    height:50,
    paddingRight:20,
    paddingLeft:20,
    backgroundColor:'#fff',
  },
  lable:{
    fontSize:16,
    color:'#000'
  },
  btu:{
    backgroundColor:'#F08C14',
    color:'#fff',
    height:50,
    textAlign:'center',
    lineHeight:50,
    fontSize:16,
    borderRadius:5,
    marginLeft:20,
    marginRight:20,
    marginTop:80
  },
});
export default connect()(Index)