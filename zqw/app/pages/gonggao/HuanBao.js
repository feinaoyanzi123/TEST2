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
import { connect } from 'react-redux'; // 引入connect函数

class HuanBao extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hbContent:[],
    }
  }

  componentDidMount() {
    let hbContent = [];
    let hbParame = this.props.data.环保公告;
    for(var i=0,len=hbParame.length;i<len;i++){
      let key = i;
      hbContent.push(
        <TouchableHighlight 
            onPress={() => { this.hbContent(key,hbParame) }} 
            key={`hbContent${i}`}  
            underlayColor='rgba(255, 255, 255, 0)'
          >
          <View style={[styles.textView,{borderTopWidth:1}]}>
            <View style={[styles.borderRight,{flex:3}]}>
              <Text numberOfLines={1} style={styles.titleText}>{`${hbParame[i].c3}`}</Text>
            </View>
            <View style={{flexDirection:'row',flex:3,alignItems:'center',justifyContent:'space-between'}}>
              <Text numberOfLines={1} style={styles.titleText}>{`${hbParame[i].fdj}`}</Text>
              <Image source={Images.topbar_next_BBB} style={{width:9,height:17}}/>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    this.setState({
      hbContent: hbContent,
    })
  }

  hbContent(key,hbParame){
    this.props.navigation.navigate('hbContent',{key:key,hbParame:hbParame})
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{paddingTop:15}}>
          {this.state.hbContent}
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
});

export default connect(
  (state) => ({
    data: state.common.data
  })
)(HuanBao)