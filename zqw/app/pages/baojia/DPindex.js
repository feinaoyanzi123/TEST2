import React, { Component } from 'react';
import {
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  ScrollView,
  Image,
  TouchableHighlight,
  Platform,
  BackHandler
} from 'react-native';
import Placeholder from 'rn-placeholder';

const http_url = 'http://xuanche.17350.com/api/offer/getDPindex';
class DPindex extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,  //当前页
      rows: 20, //每页数量
      isLoading: true,//网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
      showFoot:0, // 控制foot， 0：隐藏footer  1 ：显示加载中
      isRefreshing:false,//下拉控制
      drawerOpen: props.navigation.getParam('drawerOpen', false),
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "底盘报价",
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
        let foot = 0;
        if(responseData.page > responseData.total){
            foot = 1; //listView底部显示没有更多数据了
        }
        let data = this.state.dataArray;
        data = data.concat(responseData.list);
        this.setState({
            page: responseData.page,
            dataArray: data,
            isLoading: false,
            showFoot:foot,
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
    formData.append('page',this.state.page);
    formData.append('rows',this.state.rows);
    //请求数据
    this.fetchData(formData);
  }

  //加载等待页
  renderLoadingView() {
    const PlaceholderContent = [];
    for (let key = 0; key < this.state.rows; key++) {
      PlaceholderContent.push(
        <View style={{marginBottom:20}} key={`PlaceholderContentKey${key}`}>
          <Placeholder.ImageContent
            size={42}
            textSize={16}
            lineNumber={2}
            lineSpacing={10}
            width="100%"
            lastLineWidth="70%"
            firstLineWidth="50%"
          >
          </Placeholder.ImageContent>
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
      return (
        <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('dplist',{
            carid:item.typeid,
            carpp:item.typename
          })}
          underlayColor='rgba(255, 255, 255, 0)'
        >
          <View style={styles.item}>
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
              {item.appiconurl ? <Image source={{uri:item.appiconurl}} style={styles.image}/>:null}
            </View>
            <View style={{flex:5,flexDirection:'row'}}>
              <View style={{justifyContent:'center',flex:8}}>
                <Text numberOfLines={1} style={{fontSize:16,color:'#333'}}>{item.typename}</Text>
                <Text numberOfLines={1} style={{fontSize:12,color:'#888',marginTop:5}}>{item.dpslogan}</Text>
              </View>
              <View style={{flex:1,justifyContent:'center'}}>
                <Image source={Images.bjright} style={{width:12,height:21}}/>
              </View>
            </View>
          </View>
        </TouchableHighlight>
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
    if (this.state.showFoot === 1) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footer_title}>
            以上是全部底盘报价
          </Text>
        </View>
      );
    }else if(this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载...</Text>
        </View>
      );
    } else if(this.state.showFoot === 0){
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }

  _onEndReached(){
      //如果是正在加载中或没有更多数据了，则返回
      if(this.state.showFoot != 0 ){
          return ;
      }else{
          //底部显示正在加载更多数据
          this.setState({
              showFoot:2,
              isRefreshing:true,
          });
          //获取数据
          let formData = new FormData();
          formData.append('page',this.state.page);
          formData.append('rows',this.state.rows);
          //请求数据
          this.fetchData(formData);
      }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:SCREEN_WIDTH,
    height:SCREEN_WIDTH*2.3,
  },
  column:{
    flex:1,
    justifyContent:'space-between',
    padding:5,
    paddingTop:5,
  },
  item:{
    flex:1,
    flexDirection:'row',
    height:75,
    borderColor:'#f2f2f2',
    borderBottomWidth:1,
  },
  image:{
    width:60,
    height:50,
  },
  title:{
    width:SCREEN_WIDTH/2,
    marginTop: 5,
    fontSize:15,
    color:'#666'
  },
  time:{
    position: 'absolute',
    bottom:28,
    right:5,
    color:'#fff',
    fontSize:10,
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
  },
  load_list:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
    margin:5,
    marginBottom:10
  }
});
export default DPindex