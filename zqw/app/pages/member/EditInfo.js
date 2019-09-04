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

export default class EditInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
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
      param:this.props.navigation.state.params.param,
      type:this.props.navigation.state.params.type
    }
  }

  componentDidMount(){
  }

  _sub(){
    let type = this.props.navigation.state.params.type;
    let back = this.props.navigation.state.params.back;
    let formData = new FormData();
    switch(type){
      case 1:
        formData.append('username',this.state.param);
        break;
      case 2:
        formData.append('mobile',this.state.param);
        break;
      default:
        break;
    }
    AsyncStorage.getItem('userid',(error,val)=>{
      if(val != null){
        formData.append('id',val);
        this._fetchData(formData,type,back);
      }
    })
  }

  _fetchData(formData,type,back){
    let url = 'http://xuanche.17350.com/api/auth/change';
    fetch(url,{
      method:'POST',
      headers:{
        'contentType': 'application/json'
      },
      body:formData,
    })
    .then((response) => response.json() )
    .then((responseData)=>{
      if(responseData.res){
        this.refs.toast.show("修改成功");
        switch(type){
          case 1:
            AsyncStorage.setItem('username',this.state.param);
            break;
          case 2:
            AsyncStorage.setItem('mobile',this.state.param);
            break;
          default:
            break;
        }
        back(this.state.param);
        this.props.navigation.goBack();
      }else{
        this.refs.toast.show("修改失败");
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
          <Text style={styles.lable}>{ this.state.type == 1 ? '姓名':'手机号'}</Text>
          <TextInput
            onChangeText={(text) => this.setState({param:text})}
            value={this.state.param}
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