import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import { 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation';
import { connect } from 'react-redux'; // 引入connect函数
import *as commonAction from '../../actions/commonAction';

class DiPan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      modalVisible: false,
      fdjParame: [],
      fdjContent: []
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    let dipan = this.props.data.底盘;
    if(dipan != null){
      let fdjContent = [];
      let fdjParame = [];
      let fdjArray = dipan.M发动机 ? dipan.M发动机.split(dipan.M发动机.indexOf(" ")>=0?" ":"\r"):[];
      let fdjglArray = dipan.M功率 ? dipan.M功率.split(dipan.M功率.indexOf(" ")>=0?" ":"\r"):[];
      let fdjplArray = dipan.M排量 ? dipan.M排量.split(dipan.M排量.indexOf(" ")>=0?" ":"\r"):[];
      let fdjqyArray = dipan.M发企业 ? dipan.M发企业.split(dipan.M发企业.indexOf(" ")>=0?" ":"\r"):[];
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
          <TouchableHighlight 
            onPress={() => { this.modalView(`${key}`) }} 
            key={`fdjContent${i}`} 
            underlayColor='rgba(255, 255, 255, 0)'
          >
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
        result: dipan,
        fdjContent: fdjContent,
        fdjParame: fdjParame,
      })
    }
  }

  modalView(key){
    let fdjParame = this.state.fdjParame;
    let fdj = fdjParame[key]['fdj'];
    let gl = fdjParame[key]['gl'];
    let pl = fdjParame[key]['pl'];
    let qy = fdjParame[key]['qy'];
    this.setState({
      modalVisible: true,
      fdj:fdj,
      gl:gl,
      pl:pl,
      qy:qy
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <TouchableHighlight 
            underlayColor='rgba(255, 255, 255, 0)'
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
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
          <View>
            <Text style={styles.hrtitle}>基本参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底盘型号}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>商标</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.产品商标}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>类别</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.底盘类别}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.产品名称}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>企业</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.企业名称}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>地址</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.企业地址}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>批次</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.批次}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>排放</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.排放水平}</Text>
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
            <Text style={styles.hrtitle}>外形质量</Text>
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
              <Text numberOfLines={1} style={styles.titleText}>总质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.总质量}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>整备质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.整备质量}</Text>
            </View>
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
              <Text numberOfLines={1} style={styles.titleText}>半挂鞍座</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.半挂鞍座}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>识别代号</Text>
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

export default connect(
  (state) => ({
    data: state.common.data
  })
)(DiPan)