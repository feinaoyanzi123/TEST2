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
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      type: props.type
    };
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

  componentDidMount() {
    let url = 'http://xuanche.17350.com/api/app/getCartype';
    //请求数据
    this.fetchData(url);
  }

  render() {
    let list = [];
    list = list.concat(this.state.dataArray);
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>筛选</Text>
        </View>
        <SectionList
          sections={list}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          keyExtractor={this._keyExtractor}
          contentContainerStyle={styles.listStyle}
        />
        <View style={styles.bottomStyle}>
          <TouchableHighlight
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={()=>{ this.reset() }}
            style={{flex:1,}}
          >
            <View style={styles.bottomCZ}>
              <Text style={{color:'#ff5000', fontSize: 16}}>重置</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={()=>{ this.success() }}
            style={{flex:1,}}
          >
            <View style={styles.bottomWC}>
              <Text style={{color:'#ffffff', fontSize: 16}}>完成</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => {
    return item.key;
  }

  _renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.typename}</Text>
      </View>
    )
  }

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor='rgba(255, 255, 255, 0)'
        style={[styles.item,{backgroundColor:this.state.type.includes(item.typeid) ? '#ffe7d2':'#eaeaea'}]}
        onPress={ () => this.setType(item.typeid) }
      >
        <View>
          <Text style={styles.itemText}>{item.typename}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  setType(id){
    let data = this.state.type;
    if(!data.includes(id)){
      data.push(id);
    }else{
      let index = data.findIndex(item => item === id);
      data.splice(index, 1);
    }
    this.setState({
      type:data
    });
  }

  //重置
  reset(){
    let data = [];
    this.setState({
      type:data
    });
  }

  //完成
  success(){
    let param = this.state.type;
    this.props.success(param);
  }

};

const styles = StyleSheet.create({
  headerStyle:{
    width:SCREEN_WIDTH*0.8,
    height:45, 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:0,
    backgroundColor:'#f7f7f7',
    zIndex:999,
  },
  headerText:{
    fontSize:16,
    color:'#333',
  },
  listStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    top:45,
    paddingBottom:90,
    marginLeft: 10,
  },
  sectionHeader: {
    width:SCREEN_WIDTH*0.8,
    height: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:0.5,
    borderColor:'#999',
    borderStyle:'dotted',
  },
  sectionHeaderText: {
    fontSize:14,
    color:'#333',
  },
  item: {
    //backgroundColor: '#eaeaea',
    width: (SCREEN_WIDTH*0.8-40)/3,
    height: 40,
    flexDirection: 'row',  
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomStyle:{
    position: 'absolute',
    bottom:0,
    zIndex:999,
    width:SCREEN_WIDTH*0.8,
    flexDirection: 'row',
  },
  bottomCZ:{
    backgroundColor:'#fcf4e4',
    height:45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWC:{
    backgroundColor:'#ff5000',
    height:45,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default connect()(Drawer)