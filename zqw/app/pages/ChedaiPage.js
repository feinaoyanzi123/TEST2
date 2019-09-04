import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TextInput,
  View,
  Button,
  ListView,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Linking,
  Keyboard
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import Type from './chedai/Type'
import Background from './chedai/Background'
import Detail from './chedai/Detail'

class Chedai extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      _keyboardDismissMode:"none",
      title: '请选择',
      sf0: false,
      sf1: false,
      sfa: false,
      sfb: false,
      sfc: false,
      sfd: false,
      hka: false,
      hkb: false,
      hkc: false,
      dka: false,
      dkb: false,
      dkc: false,
      sf:0,
      hk:0,
      dk:0,
      price:0,
      shoufu:0,
      yuegong:0,
      lixi:0,
      total:0,
      fuwufei:0,
      diaochafei:0,
      gps:0,
      baozhengjin:0,
      xubaojin:0,
      other:0,
      otherVal:0,
      yugu:0,
      display:false,
      dcmodal:false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "车贷计算器",
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
        <Text 
          style={{color:'#fff',fontSize:16,marginRight:20}}
          onPress={ ()=> navigation.navigate('explain') }
        >
          说明
        </Text>
      ),
    };
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //键盘展开
  _keyboardDidShow = (e) => {
    setTimeout(
      () => {
        this.setState({
          _keyboardDismissMode:"on-drag",
        });
      }
    ,500)
  }
  //键盘收缩
  _keyboardDidHide = (e) => {
    this.setState({
      _keyboardDismissMode:"none",
    });
  }

  //车型选择
  optypetl = (title,type) => {
    if(type == 2){
      this.setState({
        title:title,
        sf0:true,
        sf1:true,
        sfa:false,
        sfb:false,
        sfc:false,
        sfd:false,
        modalVisible:false,
        display:false,
      })
    }else if(type == 3){
      this.setState({
        title:title,
        sf0:true,
        sf1:false,
        sfa:false,
        sfb:false,
        sfc:false,
        sfd:false,
        modalVisible:false,
        display:false,
      })
    }else{
      this.setState({
        title:title,
        sf0:false,
        sf1:false,
        sfa:false,
        sfb:false,
        sfc:false,
        sfd:false,
        modalVisible:false,
        display:false,
      })
    }
  }

  //金额变化
  chang(price){
    this.setState({
      price:price.replace(/[^\d.]/g, '')
    },() => {
      if(this.state.display){
        this.opresult();
      }
    });
  }

  //首付比例
  payments(key,val){
    let sf = {};
    sf['sfa'] = false;
    sf['sfb'] = false;
    sf['sfc'] = false;
    sf['sfd'] = false;
    sf[key] = true;
    sf['sf'] = val;
    this.setState(sf);
  }

  //还款年限
  repayment(key,val){
    let hk = {};
    hk['hka'] = false;
    hk['hkb'] = false;
    hk['hkc'] = false;
    hk[key] = true;
    hk['hk'] = val;
    this.setState(hk);
  }
  
  //贷款利率
  loan(key,val){
    let dk = {};
    dk['dka'] = false;
    dk['dkb'] = false;
    dk['dkc'] = false;
    dk[key] = true;
    dk['dk'] = val;
    this.setState(dk);
  }

  //计算
  count = () => {
    if(this.state.title == '请选择'){
      this.refs.toast.show("您还没有选择车型！");
      return false;
    }else if(!this.state.price){
      this.refs.toast.show("您还没有输入裸车金额！");
      return false;
    }else if(!this.state.sf){
      this.refs.toast.show("您还没有选择那种首付比例！");
      return false;
    }else if(!this.state.hk){
      this.refs.toast.show("您还没有选择那种还款年限！");
      return false;
    }else if(!this.state.dk){
      this.refs.toast.show("您还没有选择那种贷款利率！");
      return false;
    }
    this.setState({
      display:true,
    })
    this.opresult();
  }

  //调查费
  diaocha = (val) => {
    this.setState({ dcmodal: false });
    this.opresult(val);
  }

  dcsetmodal = (visible) => {
    this.setState({ dcmodal: visible });
  }

  //参数
  opresult(dcfei){
    let price = this.state.price; //裸车
    let sf = this.state.sf;//首付比例
    let hk = this.state.hk //还款年限
    let dk = this.state.dk //贷款利率
    let shoufu = parseFloat(price)*sf;

    let daikuan = parseFloat(price)*parseFloat(1-sf);//贷款金额
    //本金
    let benjin = parseFloat(daikuan)/parseFloat(hk);
    //利息
    let lixi = parseFloat(daikuan)*parseFloat(dk);
    //月供
    let yuegong = parseFloat(benjin)+parseFloat(lixi);
    //调查费
    let diaochafei = dcfei ? dcfei:3000;
    let gps = 3000;//GPS
    let baozhengjin = 0;
    if(sf==0.0){
      baozhengjin=parseFloat(daikuan)*0.2;
    }else if(sf==0.1){
      baozhengjin=parseFloat(daikuan)*0.1;
    }else if(sf==0.2){
      baozhengjin=parseFloat(daikuan)*0.1;
    }else if(sf==0.3){
      baozhengjin=parseFloat(daikuan)*0.05;
    }
    let fuwufei = 0;
    let xubaojin = 0;
    let other = '其他';
    let otherVal = 0;
    if(dk==0.0033){
      xubaojin = 5000;
      fuwufei=parseFloat(price)*0.04;
      other = '融资办卡手续费';
      otherVal = parseFloat(daikuan)*0.03;
    }else if(dk==0.0062){
      xubaojin = 3000;
      fuwufei=parseFloat(price)*0.05;
      other = '异地上牌协调费';
      otherVal = 3000;
    }else if(dk==0.0068){
      xubaojin = 5000;
      fuwufei=parseFloat(price)*0.06;
    }
    let total = Math.round(parseFloat(shoufu)
      +parseFloat(diaochafei)
      +parseFloat(fuwufei)
      +parseFloat(gps)
      +parseFloat(baozhengjin)
      +parseFloat(xubaojin)
      +parseFloat(otherVal));
    otherVal = this.toThousands(otherVal);
    //预估贷款总价
    let zonglixi=parseFloat(Math.round(lixi))*parseFloat(hk);
    let yugu = this.toThousands(Math.round(parseFloat(price)+parseFloat(total)+parseFloat(zonglixi)-parseFloat(shoufu)));
    shoufu = this.toThousands(parseFloat(price)*sf);//首付
    lixi = this.toThousands(Math.round(lixi));//利息
    yuegong = this.toThousands(Math.round(yuegong));//月供
    diaochafei = this.toThousands(Math.round(parseFloat(diaochafei)));//调查费
    fuwufei= this.toThousands(Math.round(parseFloat(fuwufei)));//服务费
    xubaojin = this.toThousands(Math.round(parseFloat(xubaojin)));//续保金
    baozhengjin = this.toThousands(Math.round(parseFloat(baozhengjin)));//保证金
    total = this.toThousands(total);//总金

    this.setState({
      shoufu:shoufu,
      yuegong:yuegong,
      lixi:lixi,
      total:total,
      fuwufei:fuwufei,
      diaochafei:diaochafei,
      gps:gps,
      baozhengjin:baozhengjin,
      xubaojin:xubaojin,
      other:other,
      otherVal:otherVal,
      yugu: yugu
    })
  }

  toThousands(num) {
    let nums = (num || 0).toString(), 
    temp = nums.length % 3;
    switch (temp) {
      case 1:
        nums = '00' + nums;
        break;
      case 2:
        nums = '0' + nums;
        break;
    }
    return nums.match(/\d{3}/g).join(',').replace(/^0+/, '');
  }

  //车型弹窗
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <ScrollView 
        keyboardDismissMode={this.state._keyboardDismissMode}
        keyboardShouldPersistTaps="always" 
        style={styles.container}
      >
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Toast 
          ref="toast"
          position='top'
          positionValue={SCREEN_HEIGHT*0.5}
        />
        <Type 
          modalVisible={this.state.modalVisible} 
          setModalVisible={this.setModalVisible.bind(this)} 
          optypetl={this.optypetl.bind(this)}
          dataArray={this.state.dataArray}>
        </Type>
        <View>
        <Background
          display={this.state.display}
          title={this.state.title}
          setModalVisible={this.setModalVisible.bind(this)}
          navigation={this.props.navigation}
          yugu={this.state.yugu}
          shoufu={this.state.shoufu}
          yuegong={this.state.yuegong}
          lixi={this.state.lixi}>
        </Background>
        <View style={styles.lcView}>
          <Text style={{fontSize:16,flex:2,color:'#333'}}>裸车价格:</Text>
          <TextInput
            ref={ (TextInput) => _zj0 = TextInput } 
            onChangeText={(text) => {this.chang(text)} }
            placeholder="请输入购车价格"
            placeholderTextColor="#FF9A47"
            underlineColorAndroid='transparent'
            style={{fontSize:14,flex:4,textAlign:'right'}}
            keyboardType='numeric'
          />
          <Text style={{fontSize:14,color:'#FF9A47',textAlign:'left',flex:1,marginLeft:-5,marginTop:-2}}>元</Text>
          <Image source={Images.edit} style={{width:15,height:13,}}/>
        </View>
        <View style={styles.choiceContent}>
          <View style={styles.choiceTitleView}>
            <Text style={styles.choiceTitle}>首付比例</Text>
          </View>
          <View style={styles.choiceList}>
            <TouchableHighlight
              onPress={() => {
                this.payments('sfa',0.0);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              disabled={this.state.sf0}
              style={[
                styles.choiceListView,
                {borderColor:this.state.sf0 ? '#ccc':(this.state.sfa ? '#FF9A47':'#aaa')}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.sf0 ? '#aaa':(this.state.sfa ? '#FF9A47':'#666')}
                ]}>0%</Text>
                {this.state.sfa ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.payments('sfb',0.1);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              disabled={this.state.sf1}
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.sf1 ? '#ccc':(this.state.sfb ? '#FF9A47':'#aaa')}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.sf1 ? '#aaa':(this.state.sfb ? '#FF9A47':'#666')}
                ]}>10%</Text>
                {this.state.sfb ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.payments('sfc',0.2);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.sfc ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.sfc ? '#FF9A47':'#666'}
                ]}>20%</Text>
                {this.state.sfc ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.payments('sfd',0.3);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.sfd ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.sfd ? '#FF9A47':'#666'}
                ]}>30%</Text>
                {this.state.sfd ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.choiceContent,{borderTopWidth:1,borderColor:'#f8f8f8'}]}>
          <View style={styles.choiceTitleView}>
            <Text style={styles.choiceTitle}>还款年限</Text>
          </View>
          <View style={styles.choiceList}>
            <TouchableHighlight
              onPress={() => {
                this.repayment('hka',12);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {borderColor:this.state.hka ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.hka ? '#FF9A47':'#666'}
                ]}>12期</Text>
                {this.state.hka ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.repayment('hkb',24);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.hkb ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.hkb ? '#FF9A47':'#666'}
                ]}>24期</Text>
                {this.state.hkb ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.repayment('hkc',36);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.hkc ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.hkc ? '#FF9A47':'#666'}
                ]}>36期</Text>
                {this.state.hkc ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.choiceContent,{borderTopWidth:1,borderColor:'#f8f8f8'}]}>
          <View style={styles.choiceTitleView}>
            <Text style={styles.choiceTitle}>贷款利率</Text>
          </View>
          <View style={styles.choiceList}>
            <TouchableHighlight
              onPress={() => {
                this.loan('dka',0.0033);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {borderColor:this.state.dka ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.dka ? '#FF9A47':'#666'}
                ]}>3.3厘</Text>
                {this.state.dka ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.loan('dkb',0.0062);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.dkb ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.dkb ? '#FF9A47':'#666'}
                ]}>6.2厘</Text>
                {this.state.dkb ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.loan('dkc',0.0068);
              }}
              underlayColor='rgba(255, 255, 255, 0)'
              style={[
                styles.choiceListView,
                {marginLeft:20,borderColor:this.state.dkc ? '#FF9A47':'#aaa'}
              ]}
            >
              <View style={styles.choiceListValue}>
                <Text style={[
                  styles.choiceListTitle,
                  {color:this.state.dkc ? '#FF9A47':'#666'}
                ]}>6.8厘</Text>
                {this.state.dkc ? <Image source={Images.sj} style={styles.choiceListImage} /> : null}
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Detail
          count={this.count.bind(this)}
          diaocha={this.diaocha.bind(this)}
          dcsetmodal={this.dcsetmodal.bind(this)}
          dcmodal={this.state.dcmodal}
          display={this.state.display}
          total={this.state.total}
          shoufu={this.state.shoufu}
          fuwufei={this.state.fuwufei}
          diaochafei={this.state.diaochafei}
          gps={this.state.gps}
          baozhengjin={this.state.baozhengjin}
          xubaojin={this.state.xubaojin}
          other={this.state.other}
          otherVal={this.state.otherVal}>  
        </Detail>
        <TouchableHighlight
          underlayColor='rgba(255, 255, 255, 0)'
          onPress={ () => Linking.openURL('tel:18008665020') }
          style={styles.countTouch}
        >
          <View style={styles.countView}>
            <Image source={Images.tel} style={styles.btuImage}/>
            <Text style={styles.btuTitle}>贷款电话: 180-0866-5020</Text>
          </View>
        </TouchableHighlight>
       </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f8f8f8',
    flex:1
  },
  lcView:{
    width:SCREEN_WIDTH,
    height:45,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#fff',
    marginBottom:10,
    borderBottomWidth:1,
    borderColor:'#F8E2DAFF'
  },
  lists: {
    height:SCREEN_HEIGHT-SCREEN_WIDTH*0.65,
  },
  choiceContent:{
    backgroundColor:'#fff',
    paddingRight:15,
    paddingLeft:15,
    height:80
  },
  choiceTitleView:{
    flex:1,
    justifyContent:'center'
  },
  choiceTitle:{
    fontSize:16,
    color:'#FF9A47'
  },
  choiceList:{
    flexDirection:'row',
    flex:1,
    alignItems:'flex-start'
  },
  choiceListView:{
    borderColor:'#aaa',
    borderWidth:1,
    borderRadius:5,
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  choiceListValue:{
    flex:1,
    paddingTop:3,
    paddingBottom:3,
    alignItems:'center'
  },
  choiceListTitle:{
    fontSize:14,
    color:'#666'
  },
  choiceListImage:{
    width:18,
    height:15,
    position:'absolute',
    bottom:0,
    right:0
  },
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
  btuImage:{
    width:12,
    height:15,
    position:'absolute',
    left:20
  },
  countTouch:{
    marginTop:65,
    marginBottom:30,
    height:46,
    flex:1,
    marginRight:15,
    marginLeft:15
  },
  countView:{
    flexDirection:'row',
    borderRadius:5,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#FF4200',
    justifyContent:'center'
  }
});

export default Chedai