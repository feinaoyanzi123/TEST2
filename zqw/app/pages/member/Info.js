import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Toast, {DURATION} from 'react-native-easy-toast'

const options = {
  title:'',
  quality: 0.8,
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'选择相册',
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Info extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "账号与安全",
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
        avatarSource: null,
        nickname:'',
        username:'',
        mobile:''
      };
      this._imagePicker = this._imagePicker.bind(this); // bind
  }

  componentDidMount(){
    AsyncStorage.getItem('nickname',(error,val)=>{
      if(val != null){
        let nickname = val;
        AsyncStorage.getItem('username',(error,val)=>{
          if(val != null){
            let username = val;
            AsyncStorage.getItem('mobile',(error,val)=>{
              if(val != null){
                let mobile = val;
                AsyncStorage.getItem('avatar',(error,val)=>{
                  let avatar = null;
                  if(val != null){
                    avatar = val;
                  }
                  this.setState({
                    nickname:nickname,
                    username:username,
                    mobile:mobile,
                    avatarSource:avatar
                  })
                })
              }
            })
          }
        })
      }
    })
  }

  _imagePicker() {
    ImagePicker.showImagePicker(options,(res) => {
      if (res.didCancel) {  // 返回
        return false;
      } else {
        let source;  // 保存选中的图片
        source = {uri: 'data:image/jpeg;base64,' + res.data};
        if (Platform.OS === 'android') {
          source = { uri: res.uri };
        } else {
          source = { uri: res.uri.replace('file://','') };
        }
        this.setState({
          avatarSource: source.uri
        });
        let formData = new FormData();
        AsyncStorage.getItem('userid',(error,val)=>{
          if(val != null){
            let file = {uri: source.uri, type: 'multipart/form-data', name: 'avatar.png'};
            formData.append("file",file);
            formData.append("id",val);
            this._fetchData(formData);
          }
        })
      }
    })
  }

  _fetchData(formData){
    let url = 'http://xuanche.17350.com/api/auth/change';
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'multipart/form-data',
      },
      body:formData,
    })
    .then((response) => response.json() )
    .then((responseData)=>{
      let avatarSource = null;
      if(responseData.res){
        this.refs.toast.show("上传成功");
        AsyncStorage.setItem('avatar',responseData.url);
        avatarSource = responseData.url;
      }else{
        this.refs.toast.show("上传失败");
      }
      this.setState({
        avatarSource:avatarSource
      });
    })
    .catch((error)=>{
      this.refs.toast.show("上传失败:网络错误");
    });
  }

  _username = (param)=>{
    this.setState({
      username:param
    })
  }

  _mobile = (param)=>{
    this.setState({
      mobile:param
    })
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
        <View style={styles.header}>
          <TouchableHighlight 
            onPress={this._imagePicker} 
            underlayColor='transparent'
          >
            { this.state.avatarSource === null ? 
              <Image source={Images.personal} style={styles.avatar}/> :
              <Image style={styles.avatar} source={{uri:this.state.avatarSource}} />
            }
          </TouchableHighlight>
        </View>
        <View style={styles.listView}>
          <Text style={styles.lable}>账号</Text>
          <View style={styles.startVal}>
            <Text style={styles.title}>{this.state.nickname}</Text>
          </View>
        </View>
        <TouchableHighlight 
          onPress={() => { 
            this.props.navigation.navigate('editinfo',{
              title:'修改姓名',
              param:this.state.username,
              type:1,
              back:this._username.bind(this)
            }) 
          }} 
          underlayColor='transparent'
        >
          <View style={[styles.listView,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>姓名</Text>
            <View style={styles.between}>
              <Text style={{fontSize:16,color:'#333',textAlign:'left'}}>{this.state.username}</Text>
              <Image
                style={{width: 10, height: 18}}
                source={Images.topbar_next_BBB}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { 
            this.props.navigation.navigate('editinfo',{
              title:'修改手机号',
              param:this.state.mobile,
              type:2,
              back:this._mobile.bind(this)
            }) 
          }}
          underlayColor='transparent'
        >
        <View style={[styles.listView,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
          <Text style={styles.lable}>手机号</Text>
          <View style={styles.between}>
            <Text style={{fontSize:16,color:'#333',textAlign:'left'}}>{this.state.mobile}</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('editpass')} 
          underlayColor='transparent'
        >
        <View style={[styles.listView,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
          <Text style={styles.lable}>修改密码</Text>
          <View style={styles.endVal}>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </View>
        </TouchableHighlight>
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
  },
  lable:{
    fontSize:16,
    color:'#333',
    flex:2
  },
  startVal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    flex:5
  },
  endVal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    flex:5
  },
  between:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:5
  },
  title:{
    fontSize:16,
    color:'#333'
  },
  header:{
    height:153,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  avatar: {
      borderRadius: 50,
      width: 100,
      height: 100
  }
});