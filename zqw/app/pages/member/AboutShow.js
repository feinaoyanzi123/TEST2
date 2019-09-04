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

class AboutShow extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "联系我们",
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
          <Image source={Images.logo} 
            style={styles.navimg}
          />
          <Text style={styles.navdesc}>
            感谢您的支持！如果您在安装、使用专汽宝中有任何问题与建议,请及时联系我们，工作人员会在第一时间回复您！
          </Text>
        </View>
        <View style={{marginTop:20,marginBottom:20}}>
          <View style={styles.header}>
            <Text style={styles.headertl}>联系我们</Text>
            <Text style={styles.headerds}>CONTACT US</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>电话</Text>
            <Text style={styles.desc}>18008665020</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>微信</Text>
            <Text style={styles.desc}>18008665020</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>QQ</Text>
            <Text style={styles.desc}>1735095511</Text>
          </View>
          <View style={[styles.list,{height:60}]}>
            <Text style={styles.title}>地址</Text>
            <Text style={styles.desc}>湖北省随州市曾都区交通大道509号国际汽配城1幢</Text>
          </View>
          <View style={[styles.list,{height:60}]}>
            <Text style={styles.title}>网址</Text>
            <Text style={styles.desc}>www.17350.com (专汽网)</Text>
          </View>
          <View style={[styles.list,{height:185}]}>
            <Text style={styles.title}>扫码</Text>
            <Image source={Images.code} style={{width:185,height:185,flex:3}} />
          </View>
        </View>
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
    justifyContent:'center',
    alignItems:'center',
  },
  navimg:{
    width:75,
    height:75,
    marginTop:25,
    marginBottom:25
  },
  navdesc:{
    marginTop:5,
    fontSize:14,
    color:'#888',
    paddingRight:20,
    paddingLeft:20
  },
  list:{
    flexDirection:'row',
    height:40,
    marginRight:50,
    marginLeft:50,
    alignItems:'center',
    marginTop:10
  },
  title:{
    fontSize:16,
    color:'#000',
    flex:1
  },
  desc:{
    fontSize:16,
    color:'#000',
    flex:3
  },
  header:{
    borderColor:'#e5e5e5',
    borderBottomWidth:1,
    flex:1,
    alignItems:'center',
    marginRight:50,
    marginLeft:50
  },
  headertl:{
    fontSize:16,
    color:'#000',
    fontWeight:'bold'
  },
  headerds:{
    fontSize:14,
    color:'#888',
    paddingTop:5,
    paddingBottom:5
  },
});
export default AboutShow