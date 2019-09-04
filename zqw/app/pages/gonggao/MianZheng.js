import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  Image,
  StyleSheet,
  ScrollView 
} from 'react-native';
import { 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation';
import { connect } from 'react-redux'; // 引入connect函数
import *as commonAction from '../../actions/commonAction';

class MianZheng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      tuce: '',
      yema: ''
    }
  }

  componentDidMount() {
    let tuce = '';
    let yema = '';
    if(this.props.data.免征公告.length){
      tuce = this.props.data.免征公告[0].cs+"("+this.props.data.免征公告[0].zcs+")";
      yema = this.props.data.免征公告[0].ym;
    }
    this.setState({
      result: this.props.data,
      tuce: tuce,
      yema: yema
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{padding:10}}>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>产品型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.产品型号}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>车辆类型</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.result.车辆型号}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>所在图册</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.tuce}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>所在页码</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.yema}</Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize:16,paddingTop:20,paddingLeft:5}}>以上查询仅供参考</Text>
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
    fontSize:16, 
    color: '#000', 
    lineHeight:48,
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
    fontSize:16, 
    color: '#133B81', 
    lineHeight:48,
    textAlign:'left',
    paddingLeft: 2,
  },
  hrtitle:{
    fontSize:16, 
    lineHeight: 36, 
    color:'#8F8F94',
    paddingLeft:5,
  }
});

export default connect(
  (state) => ({
    data: state.common.data
  })
)(MianZheng)