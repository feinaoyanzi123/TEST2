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
  BackHandler,
  Modal
} from 'react-native';
import Placeholder from 'rn-placeholder';

const http_url = 'http://xuanche.17350.com/api/offer/getBJshow';
class BJshow extends Component {
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
      modalVisible:false,
      modalSwitch:false,
      peizhi: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
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
        <TouchableHighlight 
          onPress={() => {navigation.state.params.navigatePress(true)}} 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{marginRight:20}}
        >
          <Image source={Images.phone} style={{width:25,height:25}}/>
        </TouchableHighlight>
      ),
    };
  }

  fetchData(formData) {
    formData.append('factoryid',this.props.navigation.getParam('factoryid'));
    formData.append('id',this.props.navigation.getParam('id'));
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
        //地址
        if(responseData.qt){
          this.setState({
            qt: responseData.qt
          })
        }
        let foot = 0;
        //listView底部显示没有更多数据了
        if(responseData.page > responseData.total){
            foot = 1; 
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
    this.props.navigation.setParams({navigatePress:this.setModalVisible});
    let formData = new FormData();
    formData.append('page',this.state.page);
    formData.append('rows',this.state.rows);
    //请求数据
    this.fetchData(formData);
  }

  setModalVisible = (visible) => {
    this.setState({ 
      modalVisible: visible 
    });
  }

  setModalSwitch = (switchs,peizhi) => {
    this.setState({ 
      peizhi:peizhi,
      modalSwitch: switchs
    });
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
      return (
        <TouchableHighlight 
          onPress={() => this.setModalSwitch(!this.state.modalSwitch,item.peizhi) }
          underlayColor='rgba(255, 255, 255, 0)'
        >
        {
          this.props.navigation.getParam('id') == 1 ? (
            <View style={styles.item}>
              <Text numberOfLines={1} style={styles.leftTitle}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={[styles.leftTitle,{flex:2,color:'#FE6C5DFF'}]}>
                {item.price/10000}
              </Text>
              <View style={{flex:1,alignItems:'center'}}>
                <Image source={Images.bjright} style={styles.rightImage}/>
              </View>
            </View>
          ) : (
            <View style={styles.item}>
              <Text numberOfLines={1} style={styles.leftTitle}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={[styles.leftTitle,{flex:2,color:'#FE6C5DFF'}]}>
                {item.zj}
              </Text>
              <Text numberOfLines={1} style={[styles.leftTitle,{flex:3,color:'#FE6C5DFF'}]}>
                {item.price/10000}
              </Text>
              <View style={{flex:1,alignItems:'center'}}>
                <Image source={Images.bjright} style={styles.rightImage}/>
              </View>
            </View>
          )
        }
          
        </TouchableHighlight>
      );
  }

  renderData() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
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
                <Text style={{fontSize:16,color:'#333'}}>厂家联系方式</Text>
                <Image source={Images.closed} style={{width:18,height:18,position:'absolute',right:5,top:5}}/>
              </View>
              <Text style={styles.modalContent}>
              	{this.state.qt}
              </Text>
            </View>
          </TouchableHighlight>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalSwitch}
          onRequestClose={() => {
            this.setModalSwitch(!this.state.modalSwitch)
          }}
        >
          <TouchableHighlight
            onPress={() => {
              this.setModalSwitch(!this.state.modalSwitch)
            }}
            underlayColor='rgba(255, 255, 255, 0)'
            style={{backgroundColor:'rgba(0, 0, 0, 0.5)',flex:1,flexDirection:'row'}}
          >
            <View style={[styles.modalView,{top:SCREEN_HEIGHT/4}]}>
              <View style={styles.modalTitle}>
                <Text style={{fontSize:16,color:'#333'}}>配置</Text>
                <Image source={Images.closed} style={{width:18,height:18,position:'absolute',right:5,top:5}}/>
              </View>
              <Text style={styles.modalContent}>
                {this.state.peizhi}
              </Text>
            </View>
          </TouchableHighlight>
        </Modal>
        {
          this.props.navigation.getParam('id') == 1 ? (
            <View style={[styles.item,{marginTop:10}]}>
              <Text style={styles.leftText}>上装配置</Text>
              <Text style={[styles.leftText,{flex:2}]}>参考价(万)</Text>
              <Text style={styles.rightText}>详情</Text>
            </View>
          ) : (
            <View style={[styles.item,{marginTop:10}]}>
              <Text style={styles.leftText}>车型名称</Text>
              <Text style={[styles.leftText,{flex:2}]}>轴距</Text>
              <Text style={[styles.leftText,{flex:3}]}>参考价(万)</Text>
              <Text style={styles.rightText}></Text>
            </View>
          )
        }
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
            以上是全部底盘信息
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
    backgroundColor:'#F2F2F2'
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFFFFF',
    height:50,
    marginBottom:10
  },
  leftText:{
    flex:4,
    lineHeight:50,
    textAlign:'left',
    fontSize:16,
    color:'#000000',
    borderColor:'#F2F2F2',
    borderRightWidth:1,
    marginLeft:15,
  },
  rightText:{
    flex:1,
    lineHeight:50,
    textAlign:'center',
    fontSize:16,
    color:'#000000',
  },
  leftTitle:{
  	lineHeight:50,
    marginLeft:15,
    fontSize:16,
    color:'#000000',
    flex:4,
    borderColor:'#F2F2F2',
    borderRightWidth:1
  },
  rightImage:{
    width:12,
    height:21,
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
export default BJshow