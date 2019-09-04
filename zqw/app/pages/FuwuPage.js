import React, {Component} from 'react'
import {
  Button,
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
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  SectionList,
  Linking
} from 'react-native';
import Placeholder from 'rn-placeholder'
import Geolocation from 'Geolocation';
import Maps from '../components/Maps'

const http_url = 'http://xuanche.17350.com/api/wechat/fuwu';
export default class fuwu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: '全国',
      city_id: 0,
      banner_name: '品牌',
      banner_id: 0,
      lat: 0,
      lng: 0,
      page: 1,
      rows: 20,
      error: false,
      errorInfo: "",
      showFoot: 0, // 控制footer
      isRefreshing: false, //下拉控制
      isLoading: true,
      dataArray: [],
      modalType: 0,
      modalVisible: false,
      cityList: Params.cityList,
      bannerList: Params.bannerList,
      letterList: Params.letterList,
      letterArray: Params.letterArray
    }
  }

  // 标题
  static navigationOptions = ({
    navigation
  }) => {
    return {
      title: "服务站",
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
        <View/>
      ),
    };
  }

  componentDidMount() {
     //获取位置再得到城市先后顺序，通过Promise完成
    this.getLocation();
  }

  //获取位置
  getLocation() {
    Geolocation.getCurrentPosition(
      location => {
        let url = "https://api.map.baidu.com/geocoder/v2/?output=json&ak=kGZrwtuknXULbsR2WdTlteGHPU5weWII&location="+location.coords.latitude+','+location.coords.longitude;
        this.fetchCity(url);
      },
      error => {
        this.setState({
          error: true,
          errorInfo: "获取位置失败："+ error
        })
      }
    )
  }

  //获取城市
  fetchCity = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'contentType': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      let address = responseData.result.addressComponent;
      let location = responseData.result.location;
      if (address!="") {
        Alert.alert("城市定位", "\n当前城市为" + address.province + address.city + "\n \n 是否设为当前城市？\n",
            [
                {
                    text: "设为当前城市", onPress: () => {
                        this.setCurrentCity(address.city,location.lng,location.lat);
                    }
                },
                {text: "取消" , onPress: () => {
                  this.fetchData();
                }}
            ]
        )
      }else{
        this.fetchData();
      }
    })
    .catch((error) => {
      this.setState({
        error: true,
        errorInfo: error
      })
    })
    .done();
  }

  setCurrentCity = (cityName,lng,lat) => {
    this.setState({
      city_name: cityName,
      lng: lng,
      lat: lat
    },()=>{
      this.fetchData()
    })
  }

  fetchData = () => {
    let formData = new FormData();
    formData.append('city_id', this.state.city_id);
    formData.append('banner_id', this.state.banner_id);
    formData.append('lat',  this.state.lat);
    formData.append('lng', this.state.lng);
    formData.append('page', this.state.page);
    formData.append('rows', this.state.rows);
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

  //加载等待页
  renderLoadingView() {
    const PlaceholderContent = [];
    for (let key = 0; key < this.state.rows; key++) {
      PlaceholderContent.push(
        <View style={{marginBottom:20}} key={`PlaceholderContentKey${key}`}>
            <Placeholder.Paragraph
              size={60}
              animate="fade"
              lineNumber={4}
              lineSpacing={5}
              lastLineWidth="30%"
            >
            </Placeholder.Paragraph>
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
    let tel = item.tel ? item.tel:item.phone;
    return (
      <View
        style={styles.fuwu_item}
      >
        <Text style={styles.fuwu_text}>{item.name}</Text>
        <Text style={styles.fuwu_text}>电话： {item.tel}</Text>
        <Text style={styles.fuwu_text}>地址：{item.address}</Text>
        <Text style={styles.fuwu_text}>距离：约{item.distance}公里</Text>
        <View style={styles.fuwu_btu}>
          <TouchableHighlight
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={ () => Linking.openURL('tel:'+tel) }
            style={styles.fuwu_sub}
          >
            <Text style={[styles.fuwu_text,{color:'#ffffff',lineHeight:40}]}>一键拨号</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={ () => this.goto(item.lat,item.lng,item.address)}
            style={styles.fuwu_sub}
          >
            <Text style={[styles.fuwu_text,{color:'#ffffff',lineHeight:40}]}>去这里</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  //正式内容
  renderData() {
    return (
      <View style={styles.service}>
        <View style={styles.type}>
          <TouchableOpacity style={styles.district} onPress={() => {
              this.setModalVisible(true,0)
          }}>
            <Text>{this.state.city_name}</Text>
            <Image style={styles.Images} source={Images.arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.district} onPress={() => {
              this.setModalVisible(true,1)
          }}>
            <Text>品牌</Text>
            <Image style={styles.Images} source={Images.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.fuwu}> 
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
                {length: 153, offset: 153 * index, index}
              )}
          />
        </View>
        <Modal animationType={'none'}
          transparent={true}
          visible={this.state.modalVisible}
          onrequestclose={() => {} }
          onShow={ () => {} }
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          onOrientationChange={() => {} }>
            <View style={styles.modlas}>
              <View style={styles.city}>
                <View style={styles.list}>
                  <Text onPress={() => {this.state.modalType ? this.bannerType(0,'全部'):this.cityType(0,'全国',0,0)} } style={styles.itemSelection}>{this.state.modalType ? '全部':'全国'}</Text>
                  <SectionList
                    ref="_sectionList"
                    renderItem={this._item}
                    renderSectionHeader={this.sectionHeader}
                    sections={this.state.modalType ? this.state.bannerList:this.state.cityList}
                    keyExtractor={(item, index) => item + index}
                    getItemLayout={this._getItemLayout}
                    ListFooterComponent={<View style={{height:150}}/>}  
                  />
                </View>
                <View style={styles.letter}>
                  <FlatList
                    data={this.state.modalType ? this.state.letterArray:this.state.letterList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => <Text style={styles.first} onPress={() => { this._onSectionselect(index) }}>{item}</Text>}
                  />
                </View>   
              </View>
          </View>
        </Modal>
        <Maps
          ref="maps"
          lat={this.state.lat}
          lng={this.state.lng}
          actionsheetItemClick={false}
          modalTitle={"请选择地图"}
        />
      </View>
    )
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
            以上是全部服务站信息
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

  _getItemLayout(data, index) {
    let [length, separator, header] = [50, 0, 50];
    return {length, offset: (length + separator) * index + header, index};
  }

  setModalVisible = (visible,type)=> {
    this.setState({
       modalVisible: visible,
       modalType: type
    })
  }

  goto = (lat,lng,address)=> {
    this.refs.maps.showModal(lat,lng,address)
  }

  _item = (info)=> {
      return(
        <Text style={styles.item} onPress={() => { this.state.modalType ?  this.bannerType(info.item.id,info.item.name) : this.cityType(info.item.id,info.item.name,info.item.lng,info.item.lat) }} key={info.index}>{info.item.name}</Text>
      )
  }

  cityType = (id,name,lng,lat) => {
    this.setState({
      city_id:id,
      city_name:name,
      lng: lng,
      lat: lat,
      page: 1,
      dataArray: []
    },()=>{
      this.setModalVisible(false); 
      this.fetchData();
    })
  }

  bannerType = (id,name) => {
    this.setState({
      banner_id:id,
      banner_name:name,
      page: 1,
      dataArray: []
    },()=>{
      this.setModalVisible(false);
      this.fetchData();
    })
  }

  sectionHeader = (info)=> {
    return(
      <Text style={styles.itemSelections}>{info.section.title}</Text>
    )
  }

  _onSectionselect = (key) => {
    let list = this.state.modalType?this.state.bannerList:this.state.cityList;
    let offset = key * 50;
    list.map((item,index) => {
      if(key > index){ 
        offset = offset + item.data.length*50;
      }
    });
    this.refs._sectionList.scrollToOffset({animated: true, offset: offset});
  }
}

const styles = StyleSheet.create({
  service:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#f2f2f2'
  },
  type:{
    padding: 10,
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#ffffff',
    marginBottom: 10
  },
  district:{
    flex:1,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  Images:{
    width:30,
    height:30,
  },
  modlas:{
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  city:{
    position: 'relative',
  },
  list:{
    width: SCREEN_WIDTH,
    display: 'flex',
    flexDirection: 'column',
  },
  itemSelection:{
    height: 50,
    lineHeight: 50,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#ff4200'
  },
  itemSelections:{
    height: 50,
    lineHeight: 50,
    paddingLeft: 10,
    backgroundColor: '#f8f8f8',
    color: '#ff4200'
  },
  item:{
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    lineHeight: 50,
    paddingLeft: 10
  },
  letter:{
    position: 'absolute',
    top: 0,
    right: 10,
  },
  first:{
    color:'#ff4200',
    height: SCREEN_HEIGHT/25,
    lineHeight: SCREEN_HEIGHT/25
  },
  fuwu:{
    display:'flex',
    flexDirection: 'column',
  },
  fuwu_item:{
    display:'flex',
    flex:1,
    height: 153,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingTop:10
  },
  fuwu_text:{
    color: '#757575',
    lineHeight: 20,
    paddingLeft:10,
  },
  fuwu_btu:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
  },
  fuwu_sub:{
    width: 80,
    height: 40,
    backgroundColor: '#f96e5e',
    color:'#fff'
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
  }
})