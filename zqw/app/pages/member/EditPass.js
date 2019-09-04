import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class EditPass extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '修改密码',
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

  constructor(props) {
    super(props);
    this.state = {
      oldPwd:null,
      newPwd:null
    }
  }

  componentDidMount(){
  }

  _sub(){
    let formData = new FormData();
    let newPwd = this.state.newPwd;
    let oldPwd = this.state.oldPwd;
    if(!oldPwd){
      this.refs.toast.show("请输入密码");
      oldPwdView.focus(true);
      return;
    }
    if(newPwd.length < 6){
      this.refs.toast.show("新密码长度必须大于6位");
      newPwdView.focus();
      return;
    }
    AsyncStorage.getItem('userid',(error,val)=>{
      if(val != null){
        formData.append('id',val);
        formData.append('oldPwd',val);
        formData.append('newPwd',val);
        this._fetchData(formData);
      }
    })
  }

  _fetchData(formData){
    let url = 'http://xuanche.17350.com/api/auth/pwds';
    fetch(url,{
      method:'POST',
      headers:{
        'contentType': 'application/json'
      },
      body:formData,
    })
    .then((response) => response.json() )
    .then((responseData)=>{
      if(responseData.status == 1){
        this.refs.toast.show(responseData.msg);
        this.props.navigation.goBack();
      }else{
        this.refs.toast.show(responseData.msg);
      }
    })
    .catch((error)=>{
      this.refs.toast.show("修改失败:网络错误");
    });
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
        <View style={styles.listView}>
          <Text style={styles.lable}>原密码</Text>
          <TextInput
            ref={(refs)=>{oldPwdView = refs}}
            onChangeText={(text) => this.setState({oldPwd:text})}
            value={this.state.oldPwd}
            keyboardType='numeric'
            underlineColorAndroid='transparent'
            style={styles.title}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.lable}>新密码</Text>
          <TextInput
            ref={(refs)=>{newPwdView = refs}}
            onChangeText={(text) => this.setState({newPwd:text})}
            value={this.state.newPwd}
            keyboardType='numeric'
            underlineColorAndroid='transparent'
            style={styles.title}
          />
        </View>
        <Text style={styles.btu} onPress={()=>{ this._sub() }}>保存</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  listView:{
    backgroundColor:'#fff',
    flexDirection:'row',
    height:50,
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20,
    marginTop:15
  },
  lable:{
    fontSize:16,
    color:'#333',
    flex:2
  },
  title:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    flex:5,
    fontSize:16,
    color:'#333'
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
    marginTop:50
  },
});