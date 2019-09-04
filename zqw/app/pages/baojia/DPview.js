import React, { Component } from 'react';
import {
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';
import Placeholder from 'rn-placeholder';

const http_url = 'http://xuanche.17350.com/api/offer/getDPview';
class DPview extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,//网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
      showFoot:1, // 控制foot， 0：隐藏footer  1 ：显示加载中
      isRefreshing:false,//下拉控制
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.dpxh+"底盘报价",
      headerStyle: {
        backgroundColor: '#333',
        height:45+Bar,
        paddingTop:Bar
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

  fetchData(formData) {
    formData.append('dpxh',this.props.navigation.getParam('dpxh'));
    //这个是js的访问网络的方法
    fetch(http_url,{
        method: 'POST',
        headers:{
          'contentType': 'application/json'
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((responseData) => {
        let data = this.state.dataArray;
        data = data.concat(responseData.list);
        this.setState({
          dataArray: data,
          isLoading: false,
          isRefreshing:false,
        });
    })
    .catch((error) => {
      this.setState({
        error: true,
        errorInfo: error
      })
    })
    .done();
  }

  componentDidMount(){
    let formData = new FormData();
    this.fetchData(formData);
  }

  //加载等待页
  renderLoadingView() {
    const PlaceholderContent = [];
    for (let key = 0; key < this.state.rows; key++) {
      PlaceholderContent.push(
        <View style={{marginBottom:20}} key={`PlaceholderContentKey${key}`}>
          <Placeholder.Box
            height={50}
            width="100%"
            radius={5}
            color="#efefef"
          />
        </View>,
      );
    }
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{backgroundColor:'#FFFFFF', padding:20}}>
          {PlaceholderContent}
        </ScrollView>
      </View>
    );
  }

  //加载失败view
  renderErrorView() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <View style={{backgroundColor:'#fff',height:SCREEN_HEIGHT-45}}>
          <Text style={{textAlign:'center',fontSize:16,marginTop:(SCREEN_HEIGHT-61)/3}}>
            加载失败
          </Text>
        </View>
      </View>
    );
  }

  //返回itemView
  _renderItemView = ({item,index}) => {
    const dataContent = [];
    for (let key = 0; key < item.data.length; key++) {
      dataContent.push(
        <View style={styles.list} key={`dataContentKey${key}`}>
          <Text style={[styles.leftText,{color:'#FE6C5DFF'}]}>{item.data[key]['price']/10000}</Text>
          <Text style={[styles.rightText,{lineHeight:24}]}>{item.data[key]['peizhi']}</Text>
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <View style={styles.list}>
          <Text style={styles.leftText}>轴距</Text>
          <Text style={styles.rightText}>{item.zj}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.leftText}>价格(万)</Text>
          <Text style={[styles.rightText,{color:'#000'}]}>配置</Text>
        </View>
        {dataContent}
      </View>
    );
  }

  renderData() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <FlatList
          keyExtractor={ (item,index)=> index.toString() }
          data={this.state.dataArray}
          renderItem={this._renderItemView}
          ListFooterComponent={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={0.1}
          refreshing={this.state.isRefreshing}
          getItemLayout={(data, index) => (
            // 120 是被渲染 item 的高度 ITEM_HEIGHT。
            {length: 100, offset: 100 * index, index}
          )}
        />
      </View>
    );
  }

  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
        //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }

  _renderFooter(){
    return (
      <View style={styles.footer}>
        <Text style={styles.footer_title}>
          以上是全部底盘报价
        </Text>
      </View>
    );
  }

  _onEndReached(){
    //如果是正在加载中或没有更多数据了，则返回
    if(this.state.showFoot != 0 ){
      return false;
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2F2F2'
  },
  item:{
    margin:10,
    borderColor:'#F2F2F2',
    borderWidth:1,
    borderTopWidth:0
  },
  list:{
    flexDirection:'row',
    borderColor:'#F2F2F2',
    borderTopWidth:1
  },
  leftText:{
    flex:1,
    backgroundColor:'#FFFFFF',
    color:'#000',
    fontSize:16,
    lineHeight:50,
    textAlign:'center',
    borderColor:'#F2F2F2',
    borderRightWidth:1
  },
  rightText:{
    flex:4,
    backgroundColor:'#FFFFFF',
    color:'#FE6C5DFF',
    fontSize:16,
    lineHeight:50,
    textAlign:'left',
    paddingLeft:10
  },
  footer:{
    flexDirection:'row',
    height:36,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    backgroundColor:'#fff',
  },
  footer_title:{
    color:'#999999',
    fontSize:14,
    marginTop:5,
    marginBottom:5,
  }
});
export default DPview