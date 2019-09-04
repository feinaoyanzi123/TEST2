import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Image,
  TouchableHighlight,
  TextInput,
  Switch
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux' // 引入connect函数
import *as loginAction from '../../actions/loginAction'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      switch:true,
      phone:'',
      pass:''
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: async (obj: any) => {
      obj.defaultHandler();
    }
  });

  componentDidMount(){
  }

  //组件销毁结束监听
  componentWillUnmount(){
  }
  //<Text style={styles.bt2} onPress={()=>{alert(456)}}>忘记密码</Text>
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Toast 
          ref="toast"
          position='top'
          positionValue={SCREEN_HEIGHT*0.3}
        />
        <View style={styles.content}>
          <Text style={styles.lable}>手机</Text>
          <TextInput
            onChangeText={(text) => this.setState({phone:text.replace(/[^\d.]/g, '')})}
            value={this.state.text}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            style={styles.input}
            maxLength={11}
            placeholder="请输入手机号码"
          />
        </View>
        <View style={[styles.content,{marginTop:10}]}>
          <Text style={styles.lable}>密码</Text>
          <TextInput
            onChangeText={(text) => this.setState({pass:text.replace(/[^\d.]/g, '')})}
            value={this.state.text}
            underlineColorAndroid='transparent'
            keyboardType='default'
            style={styles.input}
            maxLength={11}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </View>
        <View style={[styles.content,{marginTop:10}]}>
          <Text style={styles.lable}>自动登录</Text>
          <Switch
            onValueChange={()=>{this.setState({switch:!this.state.switch})}}
            value={this.state.switch}
          />
        </View>
        <View style={styles.btu}>
          <Text style={styles.bt1} onPress={()=>{ this._login() }}>登录</Text>
        </View>
      </View>
    )
  }

  _login(){
    if(this.state.phone&&this.state.pass){
      if(this.state.switch){
        AsyncStorage.setItem('autologin',"1");//默认自动登录
      }else{
        AsyncStorage.removeItem('autologin');
      }
      let formData  = new FormData();
      formData.append("dosubmit",'dosubmit');
      formData.append("username",this.state.phone);
      formData.append("password",this.state.pass);
      formData.append("from",'app');
      formData.append("phone",this.state.phone);
      this.fetchData(formData);
    }else{
      this.refs.toast.show("手机和密码必须填写");
    }
  }

  fetchData(params){
    let url = "http://xuanche.17350.com/api/auth/login"; 
    fetch(url , {  
      method: 'POST',  
      headers:{
        'contentType': 'application/json'
      }, 
      body: params,  
    })
    .then((response) => response.json())
    .then((json) => {  
      if(json.status == 1){
        //alert(JSON.stringify(json));
        this.refs.toast.show("登录成功");
        if(this.state.switch){
          AsyncStorage.setItem("loginToken", json.token);
        }
        AsyncStorage.setItem('userid',json.data.userid);
        AsyncStorage.setItem('nickname',json.data.nickname);
        AsyncStorage.setItem('username',json.data.username);
        AsyncStorage.setItem('mobile',json.data.mobile);
        //AsyncStorage.setItem('uservip',json.data.vip);
        this.props.dispatch(loginAction.setToken(json.token));
        this.props.navigation.navigate('Index');
      }else{
        this.refs.toast.show(json.msg);
      }  
    })
    .catch((error) => {  
      this.refs.toast.show("登录失败:网络错误");
    }); 
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f2f2f2'
  },
  content:{
    flexDirection:'row',
    height:50,
    marginTop:20,
    backgroundColor:'#fff',
    marginLeft:5,
    marginRight:5,
    alignItems:'center',
  },
  lable:{
    color:'#000',
    flex:1,
    textAlign:'left',
    fontSize:16,
    paddingLeft:10
  },
  input:{
    flex:3,
    fontSize:16
  },
  btu:{
    flex:1,
    paddingLeft:40,
    paddingRight:40,
    marginTop:10
  },
  bt1:{
    backgroundColor:'#F08C14',
    color:'#fff',
    height:50,
    textAlign:'center',
    lineHeight:50,
    fontSize:16,
    borderRadius:5,
  },
  bt2:{
    textAlign:'right',
    marginTop:20,
    fontSize:16,
    color:'#57BE25'
  }
});
export default connect()(Login)