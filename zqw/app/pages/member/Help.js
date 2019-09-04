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

class Help extends Component {
  constructor(props){
    super(props);
    this.state = {
      w1:false,
      w2:false,
      w3:false,
      w4:false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "功能介绍与帮助",
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
  }

  //组件销毁结束监听
  componentWillUnmount(){
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.navtitle}>专汽宝功能介绍</Text>
          <Text style={styles.navdesc}>Function Introduction</Text>
        </View>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('helpshow',{title:'报价查询',type:1}) }} 
          underlayColor='transparent'
        >
          <View style={styles.listView}>
            <View style={styles.llist}>
              <Text style={styles.title}>1.报价查询</Text>
              <Text style={styles.desc}>涵盖随州各大改装厂、各大品牌底盘以及热销整车报价。</Text>
            </View>
            <View style={styles.rlist}>
              <Image
                style={{width: 10, height: 18}}
                source={Images.topbar_next_BBB}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('helpshow',{title:'公告查询',type:2}) }} 
          underlayColor='transparent'
        >
          <View style={styles.listView}>
            <View style={styles.llist}>
              <Text style={styles.title}>2.公告查询</Text>
              <Text style={styles.desc}>最权威、专业、准确的专用汽车公告查询系统。</Text>
            </View>
            <View style={styles.rlist}>
              <Image
                style={{width: 10, height: 18}}
                source={Images.topbar_next_BBB}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => { this.props.navigation.navigate('helpshow',{title:'招标查询',type:3}) }} 
          underlayColor='transparent'
        >
          <View style={styles.listView}>
            <View style={styles.llist}>
              <Text style={styles.title}>3.招标查询</Text>
              <Text style={styles.desc}>实时更新最新、最全的专用车招标一手信息。</Text>
            </View>
            <View style={styles.rlist}>
              <Image
                style={{width: 10, height: 18}}
                source={Images.topbar_next_BBB}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.nav}>
          <Text style={styles.navtitle}>专汽宝帮助中心</Text>
          <Text style={styles.navdesc}>Help Center</Text>
        </View>
        <View style={styles.cj}>
          <View style={styles.cjys}></View>
          <Text style={styles.cjwt}>常见问题</Text>
        </View>
        <View>
          <TouchableHighlight 
            onPress={() => { this.setState({w1:!this.state.w1}) }} 
            underlayColor='transparent'
          >
            <View style={[styles.wt,{backgroundColor:this.state.w1 ? '#f2f2f2':'#fff'}]}>
              <Text style={{fontSize:16,color:'#000'}}>专汽宝软件怎么更新？</Text>
              <Image
                style={{width: 12, height: 6}}
                source={this.state.w1? Images.top_BBB:Images.bottom_BBB}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.wtb}>
            {this.state.w1 ? 
              <Text style={{
                fontSize:14,
                lineHeight:24,
              }}>
                专汽宝APP不需要用户手动更新。专汽宝开发团队在后台会定期统一进行更新，手机会同步接收更新提示信息，根据提示信息按步骤操作更新即可。
              </Text>:null
            }
          </View>
        </View>
        <View>
          <TouchableHighlight 
            onPress={() => { this.setState({w2:!this.state.w2}) }} 
            underlayColor='transparent'
          >
            <View style={[styles.wt,{backgroundColor:this.state.w2 ? '#f2f2f2':'#fff'}]}>
              <Text style={{fontSize:16,color:'#000'}}>专汽宝公告数据全不全？使用方不方便？</Text>
              <Image
                style={{width: 12, height: 6}}
                source={this.state.w2? Images.top_BBB:Images.bottom_BBB}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.wtb}>
            {this.state.w2 ? 
              <Text style={{
                fontSize:14,
                lineHeight:24,
              }}>
                专汽宝公告是最新批次公告，保证全面准确，专汽宝公告从用户角度加强了体验感，公告里燃油、环保等一应俱全，数据可生成图片资料直接导出，随时随地，查询方便。
              </Text>:null
            }
          </View>
        </View>
        <View>
          <TouchableHighlight 
            onPress={() => { this.setState({w3:!this.state.w3}) }} 
            underlayColor='transparent'
          >
            <View style={[styles.wt,{backgroundColor:this.state.w3 ? '#f2f2f2':'#fff'}]}>
              <Text style={{fontSize:16,color:'#000'}}>为何在报价里面没找到想查询的车型？</Text>
              <Image
                style={{width: 12, height: 6}}
                source={this.state.w3? Images.top_BBB:Images.bottom_BBB}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.wtb}>
            {this.state.w3 ? 
              <Text style={{
                fontSize:14,
                lineHeight:24,
              }}>
                专汽宝现有的车型报价是由各个改装厂及主机厂提供，专汽网团队以汽车公告为依据进行关联报价，由于些许车型较为复杂繁琐及厂家资料欠缺，个别车型报价还在完善中，敬请期待！
              </Text>:null
            }
          </View>
        </View>
        <View>
          <TouchableHighlight 
            onPress={() => { this.setState({w4:!this.state.w4}) }} 
            underlayColor='transparent'
          >
            <View style={[styles.wt,{backgroundColor:this.state.w4 ? '#f2f2f2':'#fff'}]}>
              <Text style={{fontSize:16,color:'#000'}}>专汽宝报价资料准不准？</Text>
              <Image
                style={{width: 12, height: 6}}
                source={this.state.w4? Images.top_BBB:Images.bottom_BBB}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.wtb}>
            {this.state.w4 ? 
              <Text style={{
                fontSize:14,
                lineHeight:24,
              }}>
                我们专汽宝里的报价都是根据随州各底盘改装厂的报价来更新的，随时更新上传，可以作为参考价。目前我们上线的已经有几十种车型，后续我们会不断完善更新数据。
              </Text>:null
            }
          </View>
        </View>
        <TouchableHighlight 
          onPress={() => { alert('暂未响应') }} 
          underlayColor='transparent'
        >
          <View style={styles.fk}>
            <Text style={{fontSize:16,color:'#007AFF'}}>问题反馈</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  listView:{
    height:125,
    alignItems:'center',
    flexDirection:'row',
    marginRight:20,
    marginLeft:20,
    borderColor:'#ddd',
    borderBottomWidth:1,
  },
  llist:{
    flex:9
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    color:'#0066ff',
    height:40,
    lineHeight:40
  },
  desc:{
    fontSize:16,
    color:'#6d6d72'
  },
  rlist:{
    flex:1,
    alignItems:'flex-end'
  },
  nav:{
    height:80,
    justifyContent:'center',
    marginLeft:20,
    marginRight:20,
    borderColor:'#ddd',
    borderBottomWidth:1,
  },
  navtitle:{
    fontSize:20,
    color:'#000',
    fontWeight:"bold"
  },
  navdesc:{
    fontSize:14,
    color:'#6d6d72'
  },
  cj:{
    flexDirection:'row',
    alignItems:'center',
    height:40,
    paddingLeft:20,
    paddingRight:20,
  },
  cjys:{
    width:10,
    height:20,
    backgroundColor:'#0066FF',
  },
  cjwt:{
    fontSize:18,
    color:'#0066FF',
    paddingLeft:10
  },
  wt:{
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20,
  },
  wtb:{
    marginLeft:20,
    marginRight:20,
    borderColor:'#ddd',
    borderBottomWidth:1,
  },
  fk:{
    height:140,
    alignItems:'center',
    justifyContent:'center'
  }
});
export default Help