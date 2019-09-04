import React, { Component } from 'react';
import { 
  ImageBackground, 
  View, 
  Text, 
  TouchableHighlight, 
  StyleSheet,
  Image,
} from 'react-native';

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <ImageBackground source={Images.carbj} style={styles.banner}>
        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible(true);
          }}
          underlayColor='rgba(255, 255, 255, 0)'
        >
          <View style={styles.bannerTop}>
            <Text style={styles.cx}>选择车型：</Text>
            <View style={styles.xz}>
              <Text style={styles.xzTitle}>
                {this.props.title}
              </Text>
              <Image source={Images.right} style={{width:7,height:12,}}>
              </Image>
            </View>
          </View>
        </TouchableHighlight>
        {this.props.display ? 
          <View style={styles.bannerBottom}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('estimate')
              }}
              underlayColor='rgba(255, 255, 255, 0)'
            >
              <View style={styles.b1}>
                <Text style={styles.b1Title}>预估贷款总价</Text>
                <Image source={Images.sm} style={{width:11,height:11}}/>
              </View>
            </TouchableHighlight>
            <View style={styles.b2}>
              <Text style={styles.b2Title}>{this.props.yugu}</Text>
              <Text style={styles.b2Desc}>元</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:10,}}>
              <View style={[styles.list,{borderRightWidth:0.2,backgroundColor:'#0000002e'}]}>
                <Text style={styles.listTitle}>首付</Text>
                <Text style={styles.listDesc}>{this.props.shoufu}</Text>
              </View>
              <View style={[styles.list,{borderRightWidth:0.2,backgroundColor:'#0000002e'}]}>
                <Text style={styles.listTitle}>月供(36月)</Text>
                <Text style={styles.listDesc}>{this.props.yuegong}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.listTitle}>利息</Text>
                <Text style={styles.listDesc}>{this.props.lixi}</Text>
              </View>
            </View>
          </View> : null 
        }
      </ImageBackground>
    )
  }
};

const styles = StyleSheet.create({
  banner: {
    width:SCREEN_WIDTH,
    flex:1,
  },
  bannerTop:{
    width:SCREEN_WIDTH,
    flexDirection:'row',
    height:65,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  cx:{
    fontSize:16,
    color:'#fff',
    textAlign:'left',
    flex:1
  },
  xz:{
    justifyContent:'flex-end',
    flexDirection:'row',
    flex:2,
    alignItems:'center',
  },
  xzTitle:{
    fontSize:16,
    color:'#fff',
    marginRight:10
  },
  bannerBottom:{
    width:SCREEN_WIDTH,
    borderColor:'#eaeaea',
    borderTopWidth:0.2,
  },
  b1:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    height:20,
    marginTop:10,
    marginBottom:10,
    paddingLeft:15,
    paddingRight:15,
  },
  b1Title:{
    color:'#ccc',
    fontSize:14,
    marginRight:5
  },
  b2:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  b2Title:{
    fontSize:40,
    color:'#fff',
    marginRight:5
  },
  b2Desc:{
    fontSize:14,
    color:'#fff'
  },
  list:{
    flex:1,
    justifyContent:'center',
    height:70,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0000002e'
  },
  listTitle:{
    color:'#ccc',
    fontSize:14
  },
  listDesc:{
    color:'#fff',
    fontSize:16
  }
})

export default Background