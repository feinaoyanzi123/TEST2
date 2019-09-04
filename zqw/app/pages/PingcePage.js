import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  BackHandler,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Placeholder from 'rn-placeholder';
import DrawerLayout from 'react-native-drawer-layout';
import Drawer from '../components/Drawer'

const http = 'http://xuanche.17350.com/api/app/pingce?';
export default class ceshi extends Component < Props > {
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

  static navigationOptions = ({
    navigation
  }) => {
    return {
      title: '评测',
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
    let cartypeid = this.state.cartypeid.join(",");
    let url = http + 'cartypeid=' + cartypeid + '&page=' + this.state.page + '&rows=' + this.state.rows;
    fetch(url, {
        method: 'GET',
        headers: {
          'contentType': 'application/json'
        },
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
          dataArray: data,
          page: responseData.page,
          showFoot: foot,
          isRefreshing: false,
          isLoading: false
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
    for (let key = 0; key < this.state.rows; key++) {
      PlaceholderContent.push(
        <View style={{marginBottom:20}} key={`PlaceholderContentKey${key}`}>
            <Placeholder.ImageContent
              size={80}
              textSize={16}
              lineNumber={2}
              lineSpacing={5}
              lastLineWidth="40%"
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
  _renderItemView = ({
    item,
    index
  }) => {
    let ImageContent = [];
    if (item.thumb) {
      ImageContent.push(
        <Image
            key={index} 
            style={styles.image}
            source={{uri: item.thumb}}
          />
      )
    } else {
      ImageContent.push(
        <Image 
            key={index}
            style={styles.image}
            source={Images.nopic}
          />
      )
    }
    let url = "http://www.17350.com/index.php?m=content&c=index_app&a=shownew&catid=10&id=" + item.id;
    return (
      <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('pcview',{url:url,thumb:item.thumb,title:item.title,desc:item.description}) } 
          underlayColor='rgba(255, 255, 255, 0)'
        >
          <View style={styles.listContent}>
            {ImageContent}
            <View style={styles.content}>
              <Text style={{color:'#333'}}>{item.title}</Text>
              <Text style={styles.textRight}>{this.formattime(item.inputtime)}</Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

  //时间戳转日期
  formattime(datetime) {
    let time = new Date(datetime * 1000);
    let m = time.getMonth() + 1;
    let d = time.getDate();
    return m + '-' + d;
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
          styles={drawerStyles}
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
          <View>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>
            <FlatList
              keyExtractor={ (item,index)=> index.toString() }
              data={this.state.dataArray}
              renderItem={this._renderItemView}
              ListFooterComponent={this._renderFooter.bind(this)}
              onEndReachedThreshold={0.1}
              onEndReached={this._onEndReached.bind(this)}
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

  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View style={styles.footer}>
            <Text style={styles.footer_title}>
              以上是全部车型评测
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
      return false;
    } else {
      //底部显示正在加载更多数据
      this.setState({
        showFoot: 2,
        isRefreshing: true,
      });
      //获取数据
      this.fetchData();
    }
  }

  //渲染
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

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    top: -45,
    position: 'absolute'
  },
  main: {
    paddingLeft: 3
  },
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  listContent: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eaeaea'
  },
  image: {
    width: 100,
    height: 75,
    flex: 1
  },
  content: {
    flex: 2,
    paddingLeft: 10,
  },
  textRight: {
    color: '#999',
    fontSize: 12,
    position: 'absolute',
    bottom: 15,
    right: 10
  }
});