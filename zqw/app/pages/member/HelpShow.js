import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

export default class HelpShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab1:false,
      tab2:false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`+'功能介绍与帮助',
      headerStyle: {
        backgroundColor: '#27232b',
        height:(45+Bar),
        paddingTop:Bar,
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

  componentDidMount(){
    if(this.props.navigation.state.params.type == 1){
      this.setState({
        tab1:true
      });
    }else if(this.props.navigation.state.params.type == 2){
      this.setState({
        tab2:true
      });
    }
  }

  //组件销毁结束监听
  componentWillUnmount(){
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.navtitle}>{this.props.navigation.state.params.title}</Text>
          <Text style={styles.navdesc}>
            {this.state.tab1 ?  '涵盖随州各大改装厂、各大品牌底盘以及热销整车报价。':
            (this.state.tab2 ? '最权威、专业、准确的专用汽车公告查询系统':'实时更新最新、最全的专用车招标一手信息。')}
          </Text>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_01 : 
              (this.state.tab2 ? Images.gg_help_01:Images.zb_help_01)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>进入专汽宝首页</Text>
            <Text style={styles.desc}>
              {this.state.tab1? '点击报价版块':(this.state.tab2 ? '点击公告版块':'点击招标版块')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_02 : 
              (this.state.tab2 ? Images.gg_help_02:Images.zb_help_02)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '点击任意关注车型':(this.state.tab2 ? '点击任意输入框':'点击右上角筛选')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '进入该车型':(this.state.tab2 ? '输入文字点击查询':'进行筛选')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_03 : 
              (this.state.tab2 ? Images.gg_help_03:Images.zb_help_03)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '根据筛选条件':(this.state.tab2 ? '选择车型':'右侧弹出筛选项')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '点击进入':(this.state.tab2 ? '点击进入':'点击选择')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_04 : 
              (this.state.tab2 ? Images.gg_help_04:Images.zb_help_04)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '根据筛选条件':(this.state.tab2 ? '上下滑动屏幕':'选好筛选项')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '选择车型点击进入':(this.state.tab2 ? '可浏览该车型详情':'点击完成即可')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_05 : 
              (this.state.tab2 ? Images.gg_help_05:Images.zb_help_05)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '左右滑动报价详情':(this.state.tab2 ? '点击右上角编辑':'点击任意列表项')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '查看上装底盘配置':(this.state.tab2 ? '可对参数进行编辑':'进入招标详情')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_06 : 
              (this.state.tab2 ? Images.gg_help_06:Images.zb_help_06)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '点击选上装或底盘':(this.state.tab2 ? '点击右上角发送':'上下滑动')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '上下滑动即可选择':(this.state.tab2 ? '发送公告至客户':'可浏览招标详情')}
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          <Image 
            source={ this.state.tab1? Images.bj_help_07 : 
              (this.state.tab2 ? Images.gg_help_07:Images.zb_help_07)
            } 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            {this.state.tab1? '左右滑动屏幕':(this.state.tab2 ? '发送之后':'点击右上角分享')}
            </Text>
            <Text style={styles.desc}>
            {this.state.tab1? '展示更多关注车型':(this.state.tab2 ? '客户会收到该公告':'可分享给好友')}
            </Text>
          </View>
        </View>
        {this.state.tab1 ? 
        <View style={styles.list}>
          <Image 
            source={Images.bj_help_08} 
            style={{width:178,height:107}}
          />
          <View style={styles.rlist}>
            <Text style={styles.title}>
            长按车型图标
            </Text>
            <Text style={styles.desc}>
            可编辑选中车型
            </Text>
          </View>
        </View>:null}
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  nav:{
    marginTop:20,
    paddingLeft:20,
    paddingRight:20,
  },
  navtitle:{
    fontSize:18,
    color:'#0166FF'
  },
  navdesc:{
    fontSize:16,
    color:'#8f8f94',
    marginTop:5
  },
  list:{
    paddingLeft:20,
    paddingRight:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:15,
  },
  title:{
    fontSize:14,
    color:'#000',
    textAlign:'right'
  },
  desc:{
    fontSize:14,
    color:'#FF6E1F',
    borderColor:'#FF6E1F',
    borderTopWidth:1,
    textAlign:'right'
  },
  rlist:{
    justifyContent:'flex-end',
    flex:7
  },
});