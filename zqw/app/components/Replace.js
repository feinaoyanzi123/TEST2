import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  Linking,
  Platform
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数

class Replace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      version: null,
      url: null
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setReplace(set){
    this.setState(set);
  }

  link(){
    Linking.openURL(
      this.state.url
    );
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible)
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Image source={Images.logo} style={styles.image}/>
            <Text style={styles.header}>版本更新{this.state.modalVisible}</Text>
            <Text style={styles.desc}>全新升级，丰富资源，立即体验</Text>
            <View style={styles.bottom}>
              <Text style={styles.close} onPress={()=>{ this.setModalVisible(!this.state.modalVisible) }}>
                稍后再说
              </Text>
              <Text style={styles.send} onPress={()=>{ this.link() }}>
                立即更新
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    flex:1
  },
  modalContent: {
  	backgroundColor:'#FFFFFF',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH-60,
    marginLeft:30,
    marginRight:30,
    position: 'absolute',
    top:SCREEN_HEIGHT/4,
    borderRadius:5,
  },
  image:{
    width:100,
    height:100,
    marginTop:20,
    marginBottom:20
  },
  header:{
    paddingBottom:10,
    fontSize:16,
    color:'#000'
  },
  desc:{
    paddingBottom:20,
    fontSize:14,
    color:'#000'
  },
  bottom:{
    flexDirection:'row',
    borderColor:'#F2F2F2',
    borderTopWidth:1,
    flex:1,
  },
  close:{
    flex:1,
    borderRightWidth:1,
    borderColor:'#F2F2F2',
    textAlign:'center',
    lineHeight:50,
    fontSize:16,
    color:'#FF0000'
  },
  send:{
    flex:1,
    textAlign:'center',
    lineHeight:50,
    fontSize:16,
    color:'#FF0000',
    fontWeight:'bold'
  }
});
export default Replace