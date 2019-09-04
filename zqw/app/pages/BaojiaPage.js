import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

class Baojia extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      title:'标题...',
      content:'内容...'
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "报价管理",
      headerStyle: {
        backgroundColor: '#333',
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
          <Image source={Images.notice} style={{width:25,height:25}}/>
        </TouchableHighlight>
      ),
    };
  }

  componentDidMount () {
    this.props.navigation.setParams({navigatePress:this.setModalVisible});
    let url = 'http://xuanche.17350.com/api/app/baojianotice';
    //请求数据
    this.fetchData(url);
  }

  //网络请求
  fetchData(url) {
    //这个是js的访问网络的方法
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        title:responseData.data.title,
        content:responseData.data.content
      });
    })
    .catch((error) => {
      alert('请求错误');
    })
    .done();
  }

  setModalVisible = (visible) => {
    this.setState({ 
      modalVisible: visible 
    });
  }

  pjbj(){
    this.refs.toast.show("数据还在更新中,敬请期待！");
  }

  render() {
    return (
      <View style={styles.container}>
    	  <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Toast 
          ref="toast"
          position='bottom'
          positionValue={SCREEN_HEIGHT*0.25}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
            underlayColor='rgba(255, 255, 255, 0)'
            style={{backgroundColor:'rgba(0, 0, 0, 0.5)',flex:1,flexDirection:'row'}}
          >
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <Text style={{fontSize:16,color:'#333'}}>{this.state.title}</Text>
                <Image source={Images.closed} style={{width:18,height:18,position:'absolute',right:5,top:5}}/>
              </View>
              <Text style={styles.modalContent}>{this.state.content}</Text>
            </View>
          </TouchableHighlight>
        </Modal>
        <TouchableHighlight 
          onPress={() => {this.props.navigation.navigate('dpindex')} } 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{flex:1}}
        >
          <View style={[styles.listView,{borderTopWidth:0}]}>
            <View style={styles.listLeft}>
              <Image source={Images.dpbj} style={{width:100,height:60}}/>
            </View>
            <View style={styles.listRight}>
              <View style={styles.rTitle}>
                <Text style={styles.title}>底盘报价</Text>
                <Text style={styles.desc}>东风、福田、大运、江淮、重汽、陕汽等</Text>
              </View>
              <View style={styles.rImage}>
                <Image source={Images.bjright} style={{width:11,height:21}}/>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('bjindex',{title:'上装报价',id:1}) }} 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{flex:1}}
        >
          <View style={styles.listView}>
            <View style={styles.listLeft}>
              <Image source={Images.szbj} style={{width:100,height:60}}/>
            </View>
            <View style={styles.listRight}>
              <View style={styles.rTitle}>
                <Text style={styles.title}>上装报价</Text>
                <Text style={styles.desc}>环卫车、冷藏车、油罐车、搅拌车、随车吊等</Text>
              </View>
              <View style={styles.rImage}>
                <Image source={Images.bjright} style={{width:11,height:21}}/>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('bjindex',{title:'整车报价',id:2}) }} 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{flex:1}}
        >
          <View style={styles.listView}>
            <View style={styles.listLeft}>
              <Image source={Images.zcbj} style={{width:100,height:60}}/>
            </View>
            <View style={styles.listRight}>
              <View style={styles.rTitle}>
                <Text style={styles.title}>整车报价</Text>
                <Text style={styles.desc}>平板车、售货车、房车、广告车</Text>
              </View>
              <View style={styles.rImage}>
                <Image source={Images.bjright} style={{width:11,height:21}}/>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => this.pjbj() } 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{flex:1}}
        >
          <View style={styles.listView}>
            <View style={styles.listLeft}>
              <Image source={Images.pjbj} style={{width:100,height:60}}/>
            </View>
            <View style={styles.listRight}>
              <View style={styles.rTitle}>
                <Text style={styles.title}>配件报价</Text>
                <Text style={styles.desc}>洒水炮、加油机、海底阀、泵、球阀</Text>
              </View>
              <View style={styles.rImage}>
                <Image source={Images.bjright} style={{width:11,height:21}}/>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  },
  listView: {
    flex:1,
    flexDirection:'row',
    borderColor:'#f2f2f2',
    borderTopWidth:1,
  },
  listLeft: {
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  },
  listRight: {
    flex:3,
    flexDirection:'row'
  },
  rTitle:{
    flex:2,
    justifyContent:'center',
  },
  rImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:18,
    color:'#333'
  },
  desc:{
    fontSize:12,
    color:'#FE6C5D',
    marginTop:20
  },
  modalView:{
    backgroundColor:'#fff',
    flex:1,
    width:SCREEN_WIDTH-60,
    marginLeft:30,
    marginRight:30,
    position: 'absolute',
    justifyContent:'center',
    top:SCREEN_HEIGHT/3
  },
  modalTitle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#f8f8f8',
    height:44,
  },
  modalContent:{
    lineHeight:30,
    alignItems:'center',
    textAlign:'center',
    fontSize:16,
    color:'#333',
    padding:20
  }
});


export default Baojia