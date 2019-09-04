import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableHighlight,
  Platform,
  BackHandler,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout'
import Drawer from '../components/Drawer'
import Placeholder from 'rn-placeholder'

const http_url = 'http://xuanche.17350.com/api/wechat/peijian';
export default class Peinavigator extends Component < Props > {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      rtitle: '筛选',
      page: 1,
      rows: 20,
      error: false,
      errorInfo: "",
      showFoot: 0, // 控制footer
      isRefreshing: false, //下拉控制
      isLoading: true,
      dataArray: [],
      cartypeid: [],
    }
  }

  // 标题
  static navigationOptions = ({
    navigation
  }) => {
    return {
      title: "配件商城",
      headerStyle: {
        backgroundColor: '#27232b',
        height: (45 + Bar),
        paddingTop: Bar,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
      },
      headerRight: (
        <Text
          onPress={ ()=> navigation.state.params.navigatePress()}
          style={{color:'#fff',fontSize:16,marginRight:20}}
        >筛选</Text>
      ),
    };
  }

  //开始监听 执行请求
  componentDidMount() {
    this.props.navigation.setParams({
      navigatePress: this.openDrawer.bind(this)
    });
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onDrawer);
    }
    this.fetchData();
  }

  //开关
  openDrawer = () => {
    if (this.state.drawerOpen) {
      _DrawerLayout.closeDrawer();
    } else {
      _DrawerLayout.openDrawer();
    }
  }

  //请求
  fetchData() {
    let formData = new FormData();
    formData.append('flag', 1);
    formData.append('page', this.state.page);
    formData.append('rows', this.state.rows);
    let cartypeid = this.state.cartypeid.join(",");
    if (cartypeid) {
      formData.append('cartypeid', cartypeid);
    }
    //这个是js的访问网络的方法
    fetch(http_url, {
        method: 'POST',
        headers: {
          'contentType': 'application/json'
        },
        body: formData,
      })
      .then((response) => response.json())
      .then((responseData) => {
        let foot = 0;
        if (responseData.page > responseData.total) {
          foot = 1; //listView底部显示没有更多数据了
        }
        let data = this.state.dataArray;
        data = data.concat(responseData.list);
        this.setState({
          page: responseData.page,
          dataArray: data,
          isLoading: false,
          showFoot: foot,
          isRefreshing: false,
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

  //监听 执行方法
  onDrawer = () => {
    if (this.state.drawerOpen) {
      _DrawerLayout.closeDrawer();
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
  }

  //组件销毁结束监听
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onDrawer);
    }
  }

  //加载等待页
  renderLoadingView() {
    const PlaceholderContent = [];
    for (let key = 1; key <= 10; key++) {
      PlaceholderContent.push(
        <View style={styles.load_list} key={`PlaceholderContentKey${key}`}>
          <View style={{flex:1,marginLeft:5,marginRight:5,}}>
            <Placeholder.Box
              height={(SCREEN_WIDTH-30)/2*0.69}
              width={(SCREEN_WIDTH-30)/2}
              radius={5}
              color="#f3f3f3"
            />
            <View style={{marginTop:5,}}>
              <Placeholder.Line
                color="#f3f3f3"
                width="100%"
              />
            </View>
          </View>
          <View style={{flex:1,marginRight:5,marginLeft:5,}}>
            <Placeholder.Box
              height={(SCREEN_WIDTH-30)/2*0.69}
              width={(SCREEN_WIDTH-30)/2}
              radius={5}
              color="#f3f3f3"
            />
            <View style={{marginTop:5,}}>
              <Placeholder.Line
                color="#f3f3f3"
                width="100%"
              />
            </View>
          </View>
        </View>,
      );
    }
    return (
      <View>
        <ScrollView style={{backgroundColor:'#FFFFFF',paddingTop:10,paddingBottom:20}}>
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
  _renderItemView = ({
    item,
    index
  }) => {
    return (
      <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('peijianinfo',{id:item.id,title:item.title}) }
          underlayColor='rgba(255, 255, 255, 0)'
          style={styles.item}
        >
          <View>
            <Image source={{uri:item.thumb}} style={styles.image}/>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.duration}</Text>
          </View>
        </TouchableHighlight>
    );
  }

  //正式内容
  renderData() {
    let drawerView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Drawer
          type={this.state.cartypeid} 
          success={this._success.bind(this)}>
        </Drawer>
      </View>
    );
    return (
      <DrawerLayout
        ref={(refs)=>{ _DrawerLayout = refs }}
        drawerWidth={SCREEN_WIDTH*0.8}
        drawerBackgroundColor="rgba(0,0,0,0.5)"
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => drawerView}
        onDrawerClose={()=>{
          this.setState({
            drawerOpen:false
          })
        }}
        onDrawerOpen={()=>{
          this.setState({
            drawerOpen:true
          })
        }}
      >
        <View style={styles.container}>
          <FlatList
            keyExtractor={ (item,index)=> index.toString() }
            data={this.state.dataArray}
            renderItem={this._renderItemView}
            numColumns={2}
            columnWrapperStyle={styles.column}
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
      </DrawerLayout>
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

  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footer_title}>
            以上是全部配件图片
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }

  _onEndReached() {
    //如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot != 0) {
      return;
    } else {
      //底部显示正在加载更多数据
      this.setState({
        showFoot: 2,
        isRefreshing: true,
      });
      //请求数据
      this.fetchData();
    }
  }

  _handle = () => {
    _DrawerLayout.openDrawer();
  }

  _success = (param) => {
    _DrawerLayout.closeDrawer();
    this.setState({
      page: 1,
      dataArray: [],
      cartypeid: param,
      isLoading: true,
    }, () => {
      this.fetchData();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 2.3,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    paddingTop: 5,
  },
  item: {
    margin: 5,
    marginBottom: 0,
    width: (SCREEN_WIDTH - 30) / 2,
  },
  image: {
    width: (SCREEN_WIDTH - 30) / 2,
    height: (SCREEN_WIDTH - 30) / 2 * 0.69,
    borderRadius: 3
  },
  title: {
    width: SCREEN_WIDTH / 2,
    marginTop: 5,
    fontSize: 15,
    color: '#666'
  },
  time: {
    position: 'absolute',
    bottom: 28,
    right: 5,
    color: '#fff',
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  footer_title: {
    color: '#999999',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  load_list: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
    marginBottom: 10
  }
});