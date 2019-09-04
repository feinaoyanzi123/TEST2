import React, { Component } from 'react';
import { 
  Dimensions, 
  SafeAreaView,
  SectionList, 
  View, 
  Text, 
  TouchableHighlight, 
  StyleSheet,
  Image,
  Modal,
  NetInfo
} from 'react-native';

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: null,
      isConnected: false
    };
  }

  componentDidMount(){
    //检测网络是否连接
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({isConnected: isConnected})
    })
    let url = 'http://xuanche.17350.com/api/app/chedaitype';
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
        dataArray:responseData.data
      });
    })
    .catch((error) => {
      alert('请求错误');
    })
    .done();
  }

  render() {
    let list = [];
    list = list.concat(this.state.dataArray);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(!this.props.modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() => {
                this.props.setModalVisible(!this.props.modalVisible);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
            >
              <Image source={Images.doubler} style={{width:25,height:25}} />
            </TouchableHighlight>
          </View>
          <View style={styles.listView}>
          {this.state.isConnected ?
            (<SectionList
              sections={list}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              keyExtractor={this._keyExtractor}
            />) : null }
          </View>
        </View>
      </Modal>
    )
  }

  _keyExtractor = (item, index) => {
    return item.key;
  }

  _renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    )
  }

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor='rgba(255, 255, 255, 0)'
        onPress={ ()=>{this.props.optypetl(item.title,item.bltype)} }
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }

};

const styles = StyleSheet.create({
  modalView:{
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    flex:1,
    flexDirection:'row'
  },
  ImageView:{
    width:SCREEN_WIDTH*0.33,
    alignItems:'center',
    justifyContent:'center',
    flex:3,
    marginTop:112,
  },
  listView:{
    backgroundColor:'#fff',
    width:SCREEN_WIDTH*0.67,
    flex:7,
    marginTop:112
  },
  sectionHeader: {
    flex:1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'#f8f8f8',
    backgroundColor:'#f8f8f8',
  },
  sectionHeaderText: {
    fontSize:16,
    color:'#FF9A47',
  },
  item: {
    flex:1,
    height:50,
    flexDirection: 'row',  
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderColor:'#f8f8f8',
  },
  itemText: {
    color: '#333',
    fontSize: 16,
  },
})

export default Type