import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Image,
  Linking,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数
import DeviceInfo from 'react-native-device-info';
import Replace from '../../components/Replace'

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalRef:null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "关于专汽宝",
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

  setModalRefs = () => {
    let set = {};
    set['version'] = this.props.info.version;
    set['url'] = this.props.info.url;
    set['modalVisible'] = true;
    this.refs.replace.setReplace(set);
  }

  toNum = (num) => {
    let res = num.toString();
    res = res.split('.');
    res = res.join('');
    return res;
  }
  

  render() {
    return (
      <ScrollView style={styles.container}>
        <Replace
         ref="replace"
        />
        <View style={{justifyContent:'center',alignItems:'center',marginTop:25,marginBottom:15}}>
         <Image source={Images.logo} 
           style={{width:100,height:100}}
         />
         <Text style={{marginTop:10,fontSize:26,fontWeight:'bold',color:'#000'}}>专汽宝</Text>
         <Text style={{marginTop:5,fontSize:16,color:'#000'}}>当前版本: V{DeviceInfo.getVersion()}</Text>
        </View>
        <TouchableHighlight 
         onPress={()=>{ this.toNum(this.props.info.version) > this.toNum(DeviceInfo.getVersion()) ? this.setModalRefs() : null }} 
         underlayColor='transparent'
        >
         <View style={styles.content}>
           <Text style={styles.lable}>检测更新</Text>
           <Text>{this.toNum(this.props.info.version) > this.toNum(DeviceInfo.getVersion()) ? '点击更新':'已是最新版'}</Text>
         </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { Linking.openURL('tel:18008665020') }} 
          underlayColor='transparent'
        >
          <View style={[styles.content,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>客服电话</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { alert('vsc,cf') }} 
          underlayColor='transparent'
        >
          <View style={[styles.content,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>开发团队</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('aboutshow') }} 
          underlayColor='transparent'
        >
          <View style={[styles.content,{borderColor:'#f2f2f2',borderTopWidth:1}]}>
            <Text style={styles.lable}>联系我们</Text>
            <Image
              style={{width: 10, height: 18}}
              source={Images.topbar_next_BBB}
            />
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
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
});
export default connect(
  (state) => ({
    info: state.common.info,
    url: state.common.url,
    modalVisible: state.common.modalVisible
  })
)(About)