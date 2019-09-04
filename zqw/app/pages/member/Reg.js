import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux' // 引入connect函数
import *as loginAction from '../../actions/loginAction'

class Reg extends Component {
  constructor(props){
    super(props);
    this.state = {
      phone:'',
      pass2:'',
      pass1:'',
      phoneColor:'#000',
      pass1Color:'#000',
      pass2Color:'#000'
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
            onChangeText={(text) => this._phone(text)}
            value={this.state.phone}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            style={[styles.input,{color:this.state.phoneColor}]}
            maxLength={11}
            placeholder="请输入手机号码"
          />
        </View>
        <View style={[styles.content,{marginTop:10}]}>
          <Text style={styles.lable}>密码</Text>
          <TextInput
            onChangeText={(text) => this._pass1(text)}
            value={this.state.pass1}
            underlineColorAndroid='transparent'
            keyboardType='default'
            style={[styles.input,{color:this.state.pass1Color}]}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </View>
        <View style={[styles.content,{marginTop:10}]}>
          <Text style={styles.lable}>确认</Text>
          <TextInput
            onChangeText={(text) => this._pass2(text)}
            value={this.state.pass2}
            underlineColorAndroid='transparent'
            keyboardType='default'
            style={[styles.input,{color:this.state.pass2Color}]}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btu}>
          <Text style={styles.bt1} onPress={()=>{this._register()}}>注册</Text>
        </View>
      </View>
    )
  }

  _phone(phone){
    let reg = /^0?1[3|4|5|7|8|6|9][0-9]\d{8}$/;
    if(reg.test(phone)){
      this.setState({
        phone:phone,
        phoneColor:'#000000'
      });
    }else{
      this.setState({
        phone:phone,
        phoneColor:'#FF0000'
      });
    }
  }

  _pass1(pass){
    if(pass.length < 6){
      this.setState({
        pass1:pass,
        pass1Color:'#FF0000'
      });
    }else{
      this.setState({
        pass1:pass,
        pass1Color:'#000000'
      });
    }
  }

  _pass2(pass){
    if(pass.length >= 6 && pass == this.state.pass1){
      this.setState({
        pass2:pass,
        pass2Color:'#000000'
      });
    }else{
      this.setState({
        pass2:pass,
        pass2Color:'#FF0000'
      });
    }
  }

  _register(){
    let username = this.state.phone;
    let pwd = this.state.pass1;
    let repwd = this.state.pass2;
    let reg = /^0?1[3|4|5|7|8|6|9][0-9]\d{8}$/;
    if(!username || !pwd || !repwd){
      this.refs.toast.show("手机和密码必须填写！");
      return false;
    }
    if(!reg.test(username)){
      this.refs.toast.show("手机号码不正确");
      return false;
    }
    if(pwd.length < 6){
      this.refs.toast.show("密码必须有6位以上");
      return false;
    }
    if(pwd != repwd){
      this.refs.toast.show("两次输入的密码不一致");
      return false;
    }
    let formData  = new FormData();
    formData.append("dosubmit",'dosubmit');
    formData.append("username",username);
    formData.append("password",pwd);
    formData.append("from",'app');
    formData.append("mobile",username);
    this.fetchData(formData);
  }

  fetchData(params){
    let url = "http://xuanche.17350.com/api/auth/register"; 
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
        this.refs.toast.show("注册成功");
        if(AsyncStorage.getItem("autologin")){
          AsyncStorage.setItem("loginToken", json.token);
        }
        AsyncStorage.setItem('userid',json.data.userid);
        AsyncStorage.setItem('nickname',json.data.nickname);
        AsyncStorage.setItem('username',json.data.username);
        AsyncStorage.setItem('mobile',json.data.mobile);
        this.props.dispatch(loginAction.setToken(json.token));
        this.props.navigation.navigate('Index');
      }else{
        this.refs.toast.show(json.msg);
      }  
    })
    .catch((error) => {  
      this.refs.toast.show("注册失败:网络错误");  
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
});
export default connect()(Reg)