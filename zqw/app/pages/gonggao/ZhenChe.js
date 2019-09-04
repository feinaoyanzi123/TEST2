import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  Image,
  ScrollView, 
  StyleSheet,
  Modal,
  TouchableHighlight,
  CameraRoll,
  ActivityIndicator,
  Platform
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux'; // 引入connect函数
import *as commonAction from '../../actions/commonAction';

class ZhenChe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      images: [],
      modalVisible: false,
      result: {},
      modalVisible1: false,
      fdjParame: [],
      fdjContent: []
    }
  }

  componentWillMount(){
    let id = this.props.navigation.state.params.id;
    let url = "http://xuanche.17350.com/api/app/gonggao_show?id="+id;
    this.fetchData(url);
  }

  fetchData(url){
    fetch(url,{
      method: 'GET',
      headers:{
        'contentType': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.dispatch(commonAction.setData(json.data));
      this.setState({
        result:json.data
      });
      this.createImage();
      if(json.data.底盘 != null){
        this.modalView(json.data.底盘);
      }
    })
    .catch((error) => {
      alert(error)
    })
  }

  modalView(dipan) {
    let fdjContent = [];
    let fdjParame = [];
    let fdjArray = dipan.M发动机 != null ? dipan.M发动机.split(dipan.M发动机.indexOf(" ")>=0?" ":"\r"):[];
    let fdjglArray = dipan.M功率 != null ? dipan.M功率.split(dipan.M功率.indexOf(" ")>=0?" ":"\r"):[];
    let fdjplArray = dipan.M排量 != null ? dipan.M排量.split(dipan.M排量.indexOf(" ")>=0?" ":"\r"):[];
    let fdjqyArray = dipan.M发企业 != null ? dipan.M发企业.split(dipan.M发企业.indexOf(" ")>=0?" ":"\r"):[];
    for(var i=0,len=fdjArray.length;i<len;i++){
      if(fdjArray[i]=="50"){
        fdjArray[i-1]=fdjArray[i-1]+" 50";
        fdjArray.splice(i,1);
      }
    }
    for(var i=0,len=fdjArray.length;i<len;i++){
      let key = i;
      fdjParame.push({
        "fdj":fdjArray[i],
        "gl":fdjglArray[i],
        "pl":fdjplArray[i],
        "qy":fdjqyArray[i]
      });
      fdjContent.push(
        <TouchableHighlight onPress={() => { this.modalBox(`${key}`) }} key={`fdjContent${i}`} underlayColor='rgba(255, 255, 255, 0)'>
          <View style={{flexDirection:'row',flex:1}}>
            <View style={[styles.borderRight,{flex:4}]}>
              <Text numberOfLines={1} style={styles.newsText}>{`${fdjArray[i]}`}</Text>
            </View>
            <View style={[styles.borderRight,{flex:3}]}>
              <Text numberOfLines={1} style={styles.newsText}>{`${fdjglArray[i]}`}</Text>
            </View>
            <View style={{flexDirection:'row',flex:3,alignItems:'center',justifyContent:'space-between'}}>
              <Text numberOfLines={1} style={styles.newsText}>{`${fdjplArray[i]}`}</Text>
              <Image source={Images.bottom_BBB} style={{width:17,height:9}}/>
            </View>
          </View>
        </TouchableHighlight>,
      );
    }
    this.setState({
      fdjContent: fdjContent,
      fdjParame: fdjParame,
    })
  }

  modalBox(key){
    let fdjParame = this.state.fdjParame;
    let fdj = fdjParame[key]['fdj'];
    let gl = fdjParame[key]['gl'];
    let pl = fdjParame[key]['pl'];
    let qy = fdjParame[key]['qy'];
    this.setState({
      modalVisible1: true,
      fdj:fdj,
      gl:gl,
      pl:pl,
      qy:qy
    });
  }

  createImage() {
    let result = this.state.result;
    let imgs   = this.state.images;
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.照片+'.jpg',
      props: {}
    });
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.照片2+'.jpg',
      props: {}
    });
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.照片3+'.jpg',
      props: {}
    });
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.照片4+'.jpg',
      props: {}
    });
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.后部照片+'.jpg',
      props: {}
    });
    imgs.push({
      url: 'http://upload.17350.com/gonggao/clcp/'+result.批次+'/'+result.侧后防护+'.jpg',
      props: {}
    });
    this.setState({
      result: result,
      images: imgs,
    });
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible1}
          onRequestClose={() => { alert("弹窗已关闭") }}
          >
          <TouchableHighlight 
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={() => {
              this.setState({modalVisible1:false})
            }} 
          >
          <View style={styles.modalView}>
            <View style={{backgroundColor:'#fff'}}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>发动机</Text>
                <Text style={styles.modalDesc}>{this.state.fdj}</Text>
              </View>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>功率</Text>
                <Text style={styles.modalDesc}>{this.state.gl}</Text>
              </View>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>排量</Text>
                <Text style={styles.modalDesc}>{this.state.pl}</Text>
              </View>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>厂家</Text>
                <Text style={styles.modalDesc}>{this.state.qy}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.close}>任意点击，即可关闭</Text>
              </View>
            </View>
          </View>
          </TouchableHighlight>
        </Modal>
        <ScrollView>
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
          <TouchableHighlight 
            onPress={() => this.setState({ modalVisible: true })}
            style={styles.images}
            underlayColor='rgba(255, 255, 255, 0)'
          >
            <Image
              style={styles.logo}
              source={{uri: 'http://upload.17350.com/gonggao/clcp/'+this.state.result.批次+'/'+this.state.result.照片+'.jpg'}}
            />
          </TouchableHighlight>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>商标</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={[styles.newsText,styles.borderRight]}>{this.state.result.中文品牌}</Text>
              <Text style={[styles.titleText,styles.borderRight]}>批次</Text>
              <Text numberOfLines={1} style={[styles.newsText,{flex:1}]}>{this.state.result.批次}</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>免征</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={[styles.newsText,styles.borderRight]}>{this.state.result.免征}</Text>
              <Text style={[styles.titleText,styles.borderRight]}>燃油</Text>
              <Text numberOfLines={1} style={[styles.newsText,{flex:1}]}>{this.state.result.燃油}</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>企业名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.企业名称}</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>生产地址</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.生产地址}</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>排放水平</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.排放水平}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>整车参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>长(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.长}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>宽(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.宽}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>高(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.高}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>货厢长(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.货厢长}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>货厢宽(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.货厢宽}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>货厢高(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.货厢高}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>总质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.总质量}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>额定质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.额定质量}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>整备质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.整备质量}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>底盘型号</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>底盘1</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底企型1}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>底盘2</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底企型2}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>底盘3</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底企型3}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>底盘4</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底企型4}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={[styles.borderRight,{flex:4}]}>
              <Text numberOfLines={1} style={styles.titleText}>发动机</Text>
            </View>
            <View style={[styles.borderRight,{flex:3}]}>
              <Text numberOfLines={1} style={styles.titleText}>功率</Text>
            </View>
            <View style={{flex:3}}>
              <Text numberOfLines={1} style={styles.titleText}>排量</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            {this.state.fdjContent}
          </View>
          <View>
            <Text style={styles.hrtitle}>轮胎轴距</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>轴数</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={[styles.newsText,styles.borderRight]}>{this.state.result.轴数}</Text>
              <Text style={[styles.titleText,styles.borderRight]}>轮胎数</Text>
              <Text numberOfLines={1} style={[styles.newsText,{flex:1}]}>{this.state.result.轮胎数}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>轴距(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.轴距}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>轮胎规格</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.轮胎规格}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>乘客参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>前排乘客</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.前排乘客}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>额定载客</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.额定载客}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>悬挂参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>轴荷</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.轴荷}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>前悬后悬(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.前悬后悬}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>接近离去角</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.接近离去角}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>前轮距(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.前轮距}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>后轮距(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.后轮距}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>弹簧片数(mm)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.弹簧片数}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>牵引挂车</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>挂车质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.挂车质量}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>载质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.载质量}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>半挂鞍座</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.半挂鞍座}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>反光标识</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.标识型号}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>商标</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.标识商标}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>企业</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.标识企业}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>代号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.识别代号}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>其它</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.content}>
              <Text style={styles.newsText}>{this.state.result.其它}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f4f4f4',
  },
  images:{
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  logo:{
    width: SCREEN_WIDTH-40,
    height: SCREEN_HEIGHT*0.375,
    marginTop: 5,
  },
  textView:{
    flexDirection:'row',
    borderWidth:1, 
    borderColor:'#c4c4c4',
    borderTopWidth:0,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  titleText: {
    fontSize:14, 
    color: '#000', 
    lineHeight:32,
    textAlign:'left',
    backgroundColor: '#f2f2f2',
    paddingLeft: 2,
  },
  borderRight:{
    flex:1,
    borderRightWidth:1,
    borderColor:'#c4c4c4',
  },
  borderBottom:{
    flex:1,
    borderBottomWidth:1,
    borderColor:'#c4c4c4',
  },
  content:{
    flex:3, 
    flexDirection:'row'
  },
  newsText: {
    fontSize:14, 
    color: '#133B81', 
    lineHeight:32,
    textAlign:'left',
    paddingLeft: 2,
  },
  hrtitle:{
    fontSize:16, 
    lineHeight: 36, 
    color:'#8F8F94',
    paddingLeft:5,
  },
  modalView:{
    padding:10,
    paddingTop: SCREEN_HEIGHT/3,
    height:SCREEN_HEIGHT,
    backgroundColor:'#3333335c',
  },
  modalBox:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'#c4c4c4',
    height:40
  },
  modalTitle:{
    fontSize:16,
    flex:1,
    paddingLeft:10,
    color:'#333',
    borderRightWidth:1,
    borderColor:'#c4c4c4',
    lineHeight: 40,
  },
  modalDesc:{
    fontSize:16,
    flex:3,
    paddingLeft:10,
    lineHeight: 40,
    color:'#333'
  },
  close:{
    textAlign:'center',
    color:'#333',
    fontSize:16,
    flex:1,
    height:45,
    paddingTop:10
  }
});

export default connect()(ZhenChe)