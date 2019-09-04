import React, { Component } from 'react';
import {
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  Text,
  TextInput, 
  View, 
  StatusBar,
  ScrollView,
  Image,
  CameraRoll,
  TouchableHighlight,
  Platform,
  BackHandler,
  Modal
} from 'react-native';
import Placeholder from 'rn-placeholder';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';

const http_url = 'http://xuanche.17350.com/api/offer/getBJlist';
class BJlist extends Component {
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
      index: 0,
      modalVisible:false,
      images: [],
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.carpp+"厂家",
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
          <Image source={Images.bjt2} style={{width:25,height:25}}/>
        </TouchableHighlight>
      ),
    };
  }

  fetchData(formData) {
    formData.append('carid',this.props.navigation.getParam('carid'));
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
        //图集
        if(responseData.image){
          let imgs = [];
          if(this.props.navigation.getParam('id') == 1){
            imgs = responseData.image.dppriceimg.split(',');
          }else if(this.props.navigation.getParam('id') == 2){
            imgs =responseData.image.zcpriceimg.split(',');
          }
          let cacheimgs=[];
          for (var i=0,length=imgs.length;i<length;i++) {
            cacheimgs.push({ url : imgs[i],props: {} });
          }
          this.setState({
            images: cacheimgs
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
      alert(error)
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
          onPress={() => this.props.navigation.navigate('bjshow',{
            title:item.name,
            factoryid:item.id,
            id:this.props.navigation.getParam('id')
          })}
          underlayColor='rgba(255, 255, 255, 0)'
        >
          <View style={styles.item}>
            <Text numberOfLines={1} style={{fontSize:16,color:'#333'}}>{item.name}</Text>
            <Image source={Images.bjright} style={{width:12,height:21}}/>
          </View>
        </TouchableHighlight>
      );
  }

  renderData() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer 
            imageUrls={this.state.images} 
            index={this.state.index} 
            saveToLocalByLongPress={true}
            loadingRender={this.renderLoad}
            menuContext={{ "saveToLocal": "保存图片", "cancel": "取消"}}
            onClick={() => { // 图片单击事件
              this._Close()
            }}
            onSave={(url) => { this.savePhoto(url) }}
          />
        </Modal>
        <View style={{marginBottom:10}}></View>
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
            以上是全部厂家信息
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

  renderLoad() { //这里是写的一个loading
    return (
      <View style={{ marginTop: (SCREEN_HEIGHT / 2) - 20 }}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    )
  }

  _Close() {
    this.setState({
      modalVisible: false
    });
  }

  savePhoto(url) {
    if(Platform.OS == 'ios'){
      let promise = CameraRoll.saveToCameraRoll(url);
      promise.then(function(result) {
          alert("图片已保存至相册")
      }).catch(function(error) {
          alert("保存失败")
      })
    }else{
      let storeLocation = `${RNFS.DocumentDirectoryPath}`;
      let pathName = new Date().getTime() + "-zqw.png"
      let downloadDest = `${storeLocation}/${pathName}`;
      const ret = RNFS.downloadFile({fromUrl:url,toFile:downloadDest});
      ret.promise.then(res => {
        if(res && res.statusCode === 200){
            var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
            promise.then(function(result) {
               alert("图片已保存至相册")
            }).catch(function(error) {
               alert("保存失败")
            })
        }
      })
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2F2F2'
  },
  item:{
    height:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#FFFFFF',
    paddingLeft:15,
    paddingRight:15,
    marginBottom:10
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
export default BJlist