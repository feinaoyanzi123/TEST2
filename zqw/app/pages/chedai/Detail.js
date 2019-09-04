import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableHighlight, 
  StyleSheet,
  Image,
  Modal
} from 'react-native';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen:false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.dcmodal}
        onRequestClose={() => {
          this.props.dcsetmodal(false);
        }}
      >
        <TouchableHighlight
              onPress={() => {
                this.props.dcsetmodal(false);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={{backgroundColor:'rgba(0, 0, 0, 0.5)',flex:1,flexDirection:'row'}}
            >
            <View style={{
              backgroundColor:'#fff',
              flex:1,
              width:SCREEN_WIDTH-120,
              marginLeft:60,
              marginRight:60,
              position: 'absolute',
              justifyContent:'center',
              top:SCREEN_HEIGHT/3}}
            >
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#f8f8f8',
                height:44,
              }}>
                <Text style={{fontSize:16,color:'#333'}}>调查费</Text>
                <Image source={Images.closed} style={{width:18,height:18,position:'absolute',right:5,top:5}}/>
              </View>
              <Text style={{
                lineHeight:48,
                alignItems:'center',
                textAlign:'center',
                fontSize:16,
                color:'#333'
              }}
              onPress={()=>{ this.props.diaocha(3000)}}>（省外）3000元</Text>
              <Text style={{
                lineHeight:48,
                alignItems:'center',
                textAlign:'center',
                fontSize:16,
                color:'#333',
                borderColor:'#f8f8f8',
                borderTopWidth:1
              }}
              onPress={()=>{this.props.diaocha(2000)}}>（省内）2000元</Text>
            </View>
        </TouchableHighlight>
      </Modal>
      {this.props.display ?
        <View style={{marginTop:10}}>
          <TouchableHighlight
            onPress={() => {
              this.setState({
                isopen:!this.state.isopen,
              })
            }}
            underlayColor='rgba(255, 255, 255, 0)'
          >
          <View style={styles.total}>
            <Text style={styles.title}>首次支付费用</Text>
            <View style={styles.right}>
              <Text style={styles.title}>{this.props.total}元</Text>
              <Image source={this.state.isopen ? Images.down : Images.up} style={{width:12,height:7,marginLeft:15}}/>
            </View>
          </View>
          </TouchableHighlight>
          {this.state.isopen ? 
            <View>
              <View style={styles.list}>
                <Text style={styles.title}>首付</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.shoufu}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.title}>服务费</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.fuwufei}</Text>
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.props.dcsetmodal(true);
                }}
                underlayColor='rgba(255, 255, 255, 0)'
              >
                <View style={styles.list}>
                  <Text style={styles.title}>调查费</Text>
                  <View style={styles.right}>
                    <Text style={styles.title}>{this.props.diaochafei}</Text>
                    <Image source={Images.rightc} style={{width:7,height:12,marginLeft:20}}/>
                  </View>
                </View>
              </TouchableHighlight>
              <View style={styles.list}>
                <Text style={styles.title}>GPS</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.gps}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.title}>保证金(可退)</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.baozhengjin}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.title}>续保押金(可退)</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.xubaojin}</Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.title}>{this.props.other}</Text>
                <Text style={[styles.title,{marginRight:27}]}>{this.props.otherVal}</Text>
              </View>
            </View>
             : null}
            <View style={{flex:1,paddingLeft:30,marginTop:50}}>
              <Text style={{fontSize:14,color:'#FF9A77'}}>*此结果仅供参考，实际应交费用以当地实际为准</Text>
            </View>
        </View> :
        <TouchableHighlight
          underlayColor='rgba(255, 255, 255, 0)'
          onPress={ () => {this.props.count()} }
          style={[styles.btu,{marginTop:40}]}
        >
          <View>
            <Text style={styles.btuTitle}>计算</Text>
          </View>
        </TouchableHighlight>
      }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  btu:{
    borderWidth:1,
    borderColor:'#FF4200',
    marginRight:15,
    marginLeft:15,
    height:46,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:5,
  },
  btuTitle:{
    fontSize:16,
    color:'#FF4200'
  },
  total:{
    flexDirection:'row',
    backgroundColor:'#fff',
    height:48,
    alignItems:'center',
    paddingRight:15,
    paddingLeft:15,
    justifyContent:'space-between'
  },
  right:{
    flexDirection:'row',
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:'#333'
  },
  list:{
    flexDirection:'row',
    backgroundColor:'#fff',
    height:48,
    alignItems:'center',
    paddingRight:15,
    paddingLeft:30,
    justifyContent:'space-between',
    borderColor:'#f8f8f8',
    borderTopWidth:1,
  }
})

export default Detail