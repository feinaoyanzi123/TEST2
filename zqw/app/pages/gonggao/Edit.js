import React from 'react';
import { 
  Text,
  TextInput, 
  View, 
  Button, 
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  CameraRoll,
  TouchableHighlight,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import *as commonAction from '../../actions/commonAction';
import { captureRef } from "react-native-view-shot";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      fdj: [],
      fdjgl: [],
      fdjpl: [],
      fdjContent: [],
      modalVisible: false,
      modalTitle: null,
      modalUid: null,
      modalIs: null,
      changeText: null,
      value: {
        format: "png",
        quality: 0.9,
        result: "tmpfile",
        snapshotContentContainer: true
      },
      title:null,
      xinghao:null,
      pici:null,
      rongji:null,
      zhuncheng:null,
      chechang:null,
      chekuan:null,
      chegao:null,
      xiangchang:null,
      xiangkuan:null,
      xianggao:null,
      zong:null,
      zhengbei:null,
      eding:null,
      qudong:null,
      gaosu:null,
      dxinghao:null,
      zhouju:null,
      guige:null,
      zhouhe:null,
      shuliang:null,
      zhoushu:null,
      tanhuang:null,
      lidi:null,
      ranyou:null,
      qianhou:null,
      qianlun:null,
      houlun:null,
      paifang:null,
      biaopei:null,
      xuanpei:null,
      qita:null,
      phone:null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','编辑'),
      headerStyle: {
        backgroundColor: '#27232b',
        height:45+Bar,
        paddingTop:Bar
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        flex: 1,
        textAlign: 'center',
      },
      headerRight: (
        <Text 
          style={{color:'#fff',fontSize:16,marginRight:20}}
          onPress={ ()=> navigation.state.params.navigatePress()}
        >
          发送
        </Text>
      ),
    };
  }

  snapshot = refname => () =>
  captureRef(this.refs[refname], this.state.value)
  .then(
    uri => this.saveImg(uri),
    error => alert("Oops, snapshot failed\n"+error)
  );

  //保存图片
  saveImg(img) {
    var promise = CameraRoll.saveToCameraRoll(img);
    promise.then(function(result) {
      alert('保存成功！地址如下：\n' + result);
    }).catch(function(error) {
      alert('保存失败！\n' + error);
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({navigatePress: this.snapshot("scll").bind(this) });
    let phone = null;
    AsyncStorage.getItem('lianxifangshi',(error,val)=>{
      if(val != null){
        this.setState({
          phone:val
        })
      }
    })
    let data = this.props.data;
    let fdjArray = data.M发动机 ? data.M发动机.split(data.M发动机.indexOf(" ")>=0?" ":"\r"):[];
    let fdjglArray = data.M功率 ? data.M功率.split(data.M功率.indexOf(" ")>=0?" ":"\r"):[];
    let fdjplArray = data.M排量 ? data.M排量.split(data.M排量.indexOf(" ")>=0?" ":"\r"):[];
    for(var i=0,len=fdjArray.length;i<len;i++){
      if(fdjArray[i]=="50"){
        fdjArray[i-1]=fdjArray[i-1]+" 50";
        fdjArray.splice(i,1);
      }else{
        let set = {};
        set['fdj'+i] = fdjArray[i];
        set['fdjgl'+i] = fdjglArray[i];
        set['fdjpl'+i] = fdjplArray[i];
        this.setState(set);
      }
    }
    this.setState({
      result: data,
      fdjlength: fdjArray.length,
      title: data.车辆名称+data.车辆型号,
      xinghao: data.车辆型号,
      pici: data.批次,
      rongji: data.容积,
      zhuncheng: data.前排乘客,
      chechang: data.长,
      chekuan: data.宽,
      chegao: data.高,
      xiangchang: data.货厢长,
      xiangkuan: data.货厢宽,
      xianggao: data.货厢高,
      zong: data.总质量,
      zhengbei: data.整备质量,
      eding: data.额定质量,
      qudong: data.驱动形式,
      gaosu: data.最高车速,
      dxinghao: data.底盘型号,
      zhouju: data.轴距,
      guige: data.轮胎规格,
      zhouhe: data.轴荷,
      shuliang: data.轮胎数,
      zhoushu: data.轴数,
      tanhuang: data.弹簧片数,
      lidi: data.接近离去角,
      ranyou: data.燃料种类,
      qianhou: data.前悬后悬,
      qianlun: data.前轮距,
      houlun: data.后轮距,
      paifang: data.排放水平,
      qita: data.其它,
    },()=>{
      this.fdjData();
    });
  }

  fdjData(){
    let fdjContent = [];
    let len = this.state.fdjlength;
    for (var i = 0;i<len;i++) {
      let index = i;
      if(this.state['fdj'+i]){
        fdjContent.push(
          <View 
            style={{flexDirection:'row',flex:1}}
            key={`fdjContent${i}`} 
          >
            <Text style={[styles.texth,{
              flex:2.5,
              backgroundColor:'#ffffff'
            }]}
            onPress={()=>{
              this.editDialog('fdj'+index,'发动机型号',0);
            }}
            onLongPress={()=>{
              this._del(index);
            }}
            >{this.state['fdj'+i]}</Text>
            <Text style={[styles.texth,{
              flex:2,
              backgroundColor:'#ffffff',
              borderColor:'#c4c4c4',
              borderLeftWidth:1
            }]}
            onPress={()=>{
              this.editDialog('fdjgl'+index,'额定功率',0);
            }}
            onLongPress={()=>{
              this._del(index);
            }}
            >{this.state['fdjgl'+i]}</Text>
            <Text style={[styles.texth,{
              flex:1.5,
              backgroundColor:'#ffffff',
              borderColor:'#c4c4c4',
              borderLeftWidth:1
            }]}
            onPress={()=>{
              this.editDialog('fdjpl'+index,'排量',0);
            }}
            onLongPress={()=>{
              this._del(index);
            }}
            >{this.state['fdjpl'+i]}</Text>
          </View>
        );
      }
    }
    this.setState({
      fdjContent:fdjContent
    })
  }

  //删除
  _del(i){
    Alert.alert(
      '提示',
      '确定要删除吗?',
      [
        {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
        {text: '确实', onPress: () =>{ 
          let set = {};
          set['fdj'+i] = null;
          this.setState(set,()=>{
            this.fdjData();
          });
        }},
      ]
    )
  }
  //modal层控制
  setModalVisible(key){
    this.setState({
      modalVisible:key,
    })
  }
  //输入层
  editDialog(uid,title,is){
    this.setState({
      modalVisible:true,
      modalTitle:title,
      modalUid:uid,
      modalIs:is,
    })
  }
  //确定
  changeText(){
    if(this.state.changeText){
      if(this.state.modalIs){
        AsyncStorage.setItem('lianxifangshi',this.state.changeText);
      }
      let set = {};
      set['modalVisible'] = false;
      set[this.state.modalUid] = this.state.changeText;
      this.setState(set,()=>{
        this.fdjData();
      });
    }else{
      this.setState({
        modalVisible:false
      })
    }
  }
  
  render() {
    return (
        <ScrollView 
          ref="scll" 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="always" 
          style={styles.container}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.modalBg}>
              <View style={styles.modalCn}>
                <Text style={styles.cnHeader}>
                  修改【{this.state.modalTitle}】
                </Text>
                <View style={styles.cnInput}>
                  <TextInput 
                    onChangeText={(text) => this.setState({changeText:text})}
                    defaultValue={this.state[this.state.modalUid]}
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    style={{
                      fontSize:14,
                    }}
                  />
                </View>
                <View style={styles.cnBtu}>
                  <Text 
                    onPress={()=>{ this.setModalVisible(!this.state.modalVisible)} }
                    style={styles.cnText}>取消</Text>
                  <Text 
                    onPress={()=>{this.changeText()}}
                    style={styles.cnText}>确定</Text>
                </View>
              </View>
            </View>
          </Modal>
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <View style={styles.image}>
            <Image
              style={styles.logo}
              source={{uri: 'http://upload.17350.com/gonggao/clcp/'+this.state.result.批次+'/'+this.state.result.照片+'.jpg'}}
            />
          </View>
          <TouchableHighlight 
            onPress={() => { this.editDialog('title','标题',0) }} 
            underlayColor='#e5e5e5'
          >
            <Text style={styles.textTitle}>
              {this.state.title}
            </Text>
          </TouchableHighlight>
          <Text style={styles.header}>基本参数</Text>
          <View style={styles.textView}>
            <Text style={styles.texth}>整车型号</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('xinghao','整车型号',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.xinghao}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>公告批次</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('pici','公告批次',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.pici}</Text>
            </TouchableHighlight>
            <Text style={[styles.texth,{borderColor:'#c4c4c4',borderLeftWidth:1,}]}>容积</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('rongji','容积',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.rongji}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.texth,{width:(SCREEN_WIDTH-22)*0.5,}]}>驾驶室准乘人数(人)</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zhuncheng','驾驶室准乘人数(人)',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.5}]}
            >
              <Text style={styles.titleText}>{this.state.zhuncheng}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>整车长</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('chechang','整车长',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.chechang}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>整车宽</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('chekuan','整车宽',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.chekuan}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>整车高</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('chegao','整车高',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.chegao}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>货厢长</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('xiangchang','货厢长',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.xiangchang}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>货厢宽</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('xiangkuan','货厢宽',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.xiangkuan}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>货厢高</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('xianggao','货厢高',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.xianggao}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>总质量</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zong','总质量',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.zong}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>整备质量</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zhengbei','整备质量',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.zhengbei}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>额定质量</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('eding','额定质量',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.eding}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>驱动形式</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('qudong','驱动形式',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.qudong}</Text>
            </TouchableHighlight>
            <Text style={[styles.texth,{borderColor:'#c4c4c4',borderLeftWidth:1,}]}>最高车速</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('gaosu','最高车速',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.gaosu}</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.header}>底盘参数</Text>
          <View style={styles.textView}>
            <Text style={styles.texth}>底盘型号</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('dxinghao','底盘型号',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.dxinghao}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>轴距</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zhouju','轴距',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.zhouju}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>轮胎规格</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('guige','轮胎规格',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.guige}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>轴荷</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zhouhe','轴荷',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.zhouhe}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>轮胎数量</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('shuliang','轮胎数量',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.shuliang}</Text>
            </TouchableHighlight>
            <Text style={[styles.texth,{borderColor:'#c4c4c4',borderLeftWidth:1,}]}>轴数</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('zhoushu','轴数',0) }} 
              underlayColor='#e5e5e5'
              style={styles.textb}
            >
              <Text style={styles.titleText}>{this.state.zhoushu}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>弹簧片数</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('tanhuang','弹簧片数',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.tanhuang}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.texth,{width:(SCREEN_WIDTH-22)*0.5,}]}>接近离去角</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('lidi','接近离去角',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.5}]}
            >
              <Text style={styles.titleText}>{this.state.lidi}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>燃料种类</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('ranyou','燃料种类',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.ranyou}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>前悬后悬</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('qianhou','前悬后悬',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.qianhou}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>前轮距</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('qianlun','前轮距',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.qianlun}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>后轮距</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('houlun','后轮距',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.houlun}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>排放标准</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('paifang','排放标准',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.paifang}</Text>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection:'row',borderColor:'#c4c4c4',borderBottomWidth:1}}>
            <Text style={[styles.texth,{flex:2.5}]}>发动机型号</Text>
            <Text style={[styles.texth,{flex:2,borderColor:'#c4c4c4',borderLeftWidth:1,}]}>额定功率</Text>
            <Text style={[styles.texth,{flex:1.5,borderColor:'#c4c4c4',borderLeftWidth:1,}]}>排量</Text>
          </View>
          {this.state.fdjContent}
          <Text style={styles.header}>上装配置参数</Text>
          <View style={styles.textView}>
            <Text style={styles.texth}>标配</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('biaopei','标配',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.biaopei}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.textView}>
            <Text style={styles.texth}>选配</Text>
            <TouchableHighlight 
              onPress={() => { this.editDialog('xuanpei','选配',0) }} 
              underlayColor='#e5e5e5'
              style={[styles.textb,{width:(SCREEN_WIDTH-22)*0.75}]}
            >
              <Text style={styles.titleText}>{this.state.xuanpei}</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight 
            onPress={() => { this.editDialog('qita','其它',0) }} 
            underlayColor='#e5e5e5'
            style={styles.textd}
          >
            <Text style={styles.textdt}>{this.state.qita}</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={() => { this.editDialog('phone','联系方式',1) }} 
            underlayColor='#e5e5e5'
            style={styles.textd}
          >
            <Text style={styles.textdt}>{this.state.phone ? this.state.phone:'添加联系方式后会自动保存'}</Text>
          </TouchableHighlight>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    borderColor:'#c4c4c4',
    margin:10,
    backgroundColor:'#fff'
  },
  image:{
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#c4c4c4',
    borderBottomWidth:1,
    backgroundColor:'#fff'
  },
  logo:{
    width: SCREEN_WIDTH-40,
    height: SCREEN_HEIGHT*0.35,
    marginTop:10,
    marginBottom:10,
  },
  header:{
    backgroundColor:'#f2f2f2',
    width: SCREEN_WIDTH,
    height: 40,
    textAlign: 'left',
    lineHeight: 40,
    fontSize:16,
    color:'#000',
    borderColor:'#c4c4c4',
    borderBottomWidth:0.5,
    paddingLeft:5,
  },
  textView:{
    flexDirection:'row',
    borderColor:'#c4c4c4',
    borderBottomWidth:1,
    width:SCREEN_WIDTH
  },
  textTitle:{
    width: SCREEN_WIDTH,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    fontSize:16,
    color:'#000',
    borderColor:'#c4c4c4',
    borderBottomWidth:1,
    backgroundColor:'#fff'
  },
  texth:{
    width:(SCREEN_WIDTH-22)*0.25,
    lineHeight:40,
    paddingLeft:5,
    fontSize:16,
    color:'#000',
    backgroundColor:'#f2f2f2',
  },
  titleText: {
    textAlign: 'left',
    lineHeight: 40,
    fontSize:16,
    color:'#000',
    paddingLeft:5,
  },
  textb:{
    backgroundColor:'#ffffff',
    width:(SCREEN_WIDTH-22)*0.25,
    borderColor:'#c4c4c4',
    borderLeftWidth:1,
  },
  textd:{
    backgroundColor:'#ffffff',
    padding:5,
    borderColor:'#c4c4c4',
    borderBottomWidth:1,
  },
  textdt:{
    fontSize:14,
    color:'#000',
    lineHeight:28,
  },
  modalBg:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#00000069'
  },
  modalCn:{
    backgroundColor:'#fff',
    width:SCREEN_WIDTH-80,
  },
  cnHeader:{
    textAlign:'center',
    fontSize:16,
    color:'#000',
    marginTop:15,
    marginBottom:15,
  },
  cnInput:{
    borderWidth:0.5,
    borderRadius:5,
    borderColor:'#C9C8C7',
    marginLeft:5,
    marginRight:5,
  },
  cnBtu:{
    flexDirection:'row',
    marginTop:15,
    borderTopWidth:1,
    borderColor:'#C9C8C7',
  },
  cnText:{
    flex:1,
    color:'#3385ff',
    textAlign:'center',
    fontSize:16,
    lineHeight:48,
  }
});

export default connect(
  (state) => ({
    data: state.common.data
  })
)(Edit)