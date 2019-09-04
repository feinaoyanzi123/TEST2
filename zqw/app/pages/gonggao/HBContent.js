import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight 
} from 'react-native';

class HBContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      row:{},
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','环保公告'),
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
        <View/>
      ),
    };
  }

  componentDidMount() {
    let key = this.props.navigation.state.params.key;
    let hbParame = this.props.navigation.state.params.hbParame;
    let row = hbParame[key];
    this.setState({
      row: row
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{paddingTop:15}}>
          <View style={[styles.textView,{borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>产品名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.carname}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>产品型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.c3}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>产品品牌</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.shangbiao}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>企业名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.com1}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>发动机企业</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.com2}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>发动机型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.fdj}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>车辆类型</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.cat}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>阶段</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.jieduan}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text style={styles.titleText}>时间</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.titleText}>{this.state.row.time}</Text>
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
    fontSize:16, 
    color: '#000', 
    lineHeight:40,
    textAlign:'left',
    backgroundColor: '#f2f2f2',
    paddingLeft: 2,
  },
  borderRight:{
    flex:1,
    borderRightWidth:1,
    borderColor:'#c4c4c4',
  },
  content:{
    flex:3, 
    flexDirection:'row'
  },
});

export default HBContent