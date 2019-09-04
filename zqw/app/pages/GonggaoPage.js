import React, { Component } from 'react';
import {
  StatusBar,
  ScrollView,
  Picker,
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { TabBar } from 'antd-mobile-rn';
import PickerModel from '../components/PickerModel'
import { connect } from 'react-redux'; // 引入connect函数

class Gonggao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheList: [],
      paifang:[
        {
          label:'不限',
          value:'不限'
        },
        {
          label:'国四',
          value:'国四',
        },
        {
          label:'国五',
          value:'国五',
        },
        {
          label:'国六',
          value:'国六',
        }
      ],
      pf:[],
      ranyou:[
        {
          label:'不限',
          value:'不限'
        },
        {
          label:'柴油',
          value:'柴油'
        },
        {
          label:'汽油',
          value:'汽油'
        },
        {
          label:'天然气(NG、LNG、CNG)',
          value:'天然气(NG、LNG、CNG)'
        },
        {
          label:'电、蓄电池、动力电池',
          value:'电、蓄电池、动力电池'
        },
        {
          label:'混合动力',
          value:'混合动力'
        },
        {
          label:'氢、甲醇',
          value:'氢、甲醇'
        },
        {
          label:'液化石油气(LPG)',
          value:'液化石油气(LPG)'
        },
      ],
      ry:[],
      hide:true,
      _keyboardDismissMode:"none",
      clmc:'',
      clxh:'',
      zwpp:'',
      qymc:'',
      dpxh:'',
      dpcj:'',
      zj0:'',
      zj1:'',
      zs:'',
      scdz:'',
      zwpp:'',
      rj0:'',
      rj1:'',
      qt:'',
      fdj:'',
      lts:'',
      ltgg:'',
      edzk:'',
      pc0:'',
      pc1:'',
      zzl0:'',
      zzl1:'',
      edzl0:'',
      edzl1:'',
      zbzl0:'',
      zbzl1:'',
      c0:'',
      c1:'',
      k0:'',
      k1:'',
      g0:'',
      g1:'',
      hc0:'',
      hc1:'',
      hk0:'',
      hk1:'',
      hg0:'',
      hg1:'',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','汽车公告'),
      headerStyle: {
        backgroundColor: '#27232b',
        height:(45+Bar),
        paddingTop:Bar,
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
        <Text 
          style={{color:'#fff',fontSize:16,marginRight:20}}
          onPress={ ()=> navigation.state.params.navigatePress()}
        >
          历史
        </Text>
      ),
    };
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.navigation.setParams({title: '汽车公告-('+this.props.batch+'批次)'})
    this.props.navigation.setParams({navigatePress:this.openNav});
    AsyncStorage.getItem('cacheList',(error,val)=>{
      if(val !== null ){
        let ggcxList = JSON.parse(val);
        let index = this.props.index;
        let set = {};
        set['cacheList'] = JSON.parse(val);
        for(var item in ggcxList[index]){
          set[item] = ggcxList[index][item]
        }
        this.setState(set)
      }
    })
  }

  openNav = () => {
    this.props.navigation.navigate('ggindex', {
      onGoBack: () => {
        this.clearInput();
        AsyncStorage.getItem('cacheList',(error,val)=>{
          if(val !== null ){
            let ggcxList = JSON.parse(val);
            let index = this.props.index;
            let set = {};
            for(var item in ggcxList[index]){
              set[item] = ggcxList[index][item]
            }
            this.setState(set)
          }
        })
      },
    });
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
  //输入内容
  search () {
    let cacheList = this.state.cacheList;
    let cacheData = {};
    let formData  = new FormData();
    let count = 0;
    if(this.state.clmc){
      count++;
      cacheData['clmc'] = this.state.clmc;
      formData.append("clmc",this.state.clmc);
    }
    if(this.state.zwpp){
      count++;
      cacheData['zwpp'] = this.state.zwpp;
      formData.append("zwpp",this.state.zwpp);
    }
    if(this.state.clxh){
      count++;
      cacheData['clxh'] = this.state.clxh;
      formData.append("clxh",this.state.clxh);
    }
    if(this.state.qymc){
      count++;
      cacheData['qymc'] = this.state.qymc;
      formData.append("qymc",this.state.qymc);
    }
    if(this.state.dpxh){
      count++;
      cacheData['dpxh'] = this.state.dpxh;
      formData.append("dpxh",this.state.dpxh);
    }
    if(this.state.dpcj){
      count++;
      cacheData['dpcj'] = this.state.dpcj;
      formData.append("dpcj",this.state.dpcj);
    }
    if(this.state.zs){
      count++;
      cacheData['zs'] = this.state.zs;
      formData.append("zs",this.state.zs);
    }
    if(this.state.pf[0]){
      count++;
      cacheData['pf'] = this.state.pf;
      formData.append("pf",this.state.pf[0]);
    }
    if(this.state.scdz){
      count++;
      cacheData['scdz'] = this.state.scdz;
      formData.append("scdz",this.state.scdz);
    }
    if(this.state.qt){
      count++;
      cacheData['qt'] = this.state.qt;
      formData.append("qt",this.state.qt);
    }
    if(this.state.fdj){
      count++;
      cacheData['fdj'] = this.state.fdj;
      formData.append("fdj",this.state.fdj);
    }
    if(this.state.lts){
      count++;
      cacheData['lts'] = this.state.lts;
      formData.append("lts",this.state.lts);
    }
    if(this.state.ltgg){
      count++;
      cacheData['ltgg'] = this.state.ltgg;
      formData.append("ltgg",this.state.ltgg);
    }
    if(this.state.ry[0]){
      count++;
      cacheData['ry'] = this.state.ry;
      formData.append("ry",this.state.ry[0]);
    }
    if(this.state.edzk){
      count++;
      cacheData['edzk'] = this.state.edzk;
      formData.append("edzk",this.state.edzk);
    }
    if(this.state.zj0){
      count++;
      cacheData['zj0'] = this.state.zj0;
      formData.append("zj0",this.state.zj0);
    }
    if(this.state.zj1){
      count++;
      cacheData['zj1'] = this.state.zj1;
      formData.append("zj1",this.state.zj1);
    }
    if(this.state.rj0){
      count++;
      cacheData['rj0'] = this.state.rj0;
      formData.append("rj0",this.state.rj0);
    }
    if(this.state.rj1){
      count++;
      cacheData['rj1'] = this.state.rj1;
      formData.append("rj1",this.state.rj1);
    }
    if(this.state.fdjgl0){
      count++;
      cacheData['fdjgl0'] = this.state.fdjgl0;
      formData.append("fdjgl0",this.state.fdjgl0);
    }
    if(this.state.fdjgl1){
      count++;
      cacheData['fdjgl1'] = this.state.fdjgl1;
      formData.append("fdjgl1",this.state.fdjgl1);
    }
    if(this.state.pc0){
      count++;
      cacheData['pc0'] = this.state.pc0;
      formData.append("pc0",this.state.pc0);
    }
    if(this.state.pc1){
      count++;
      cacheData['pc1'] = this.state.pc1;
      formData.append("pc1",this.state.pc1);
    }
    if(this.state.zzl0){
      count++;
      cacheData['zzl0'] = this.state.zzl0;
      formData.append("zzl0",this.state.zzl0);
    }
    if(this.state.zzl1){
      count++;
      cacheData['zzl1'] = this.state.zzl1;
      formData.append("zzl1",this.state.zzl1);
    }
    if(this.state.edzl0){
      count++;
      cacheData['edzl0'] = this.state.edzl0;
      formData.append("edzl0",this.state.edzl0);
    }
    if(this.state.edzl1){
      count++;
      cacheData['edzl1'] = this.state.edzl1;
      formData.append("edzl1",this.state.edzl1);
    }
    if(this.state.zbzl0){
      count++;
      cacheData['zbzl0'] = this.state.zbzl0;
      formData.append("zbzl0",this.state.zbzl0);
    }
    if(this.state.zbzl1){
      count++;
      cacheData['zbzl1'] = this.state.zbzl1;
      formData.append("zbzl1",this.state.zbzl1);
    }
    if(this.state.c0){
      count++;
      cacheData['c0'] = this.state.c0;
      formData.append("c0",this.state.c0);
    }
    if(this.state.c1){
      count++;
      cacheData['c1'] = this.state.c1;
      formData.append("c1",this.state.c1);
    }
    if(this.state.k0){
      count++;
      cacheData['k0'] = this.state.k0;
      formData.append("k0",this.state.k0);
    }
    if(this.state.k1){
      count++;
      cacheData['k1'] = this.state.k1;
      formData.append("k1",this.state.k1);
    }
    if(this.state.g0){
      count++;
      cacheData['g0'] = this.state.g0;
      formData.append("g0",this.state.g0);
    }
    if(this.state.g1){
      count++;
      cacheData['g1'] = this.state.g1;
      formData.append("g1",this.state.g1);
    }
    if(this.state.hc0){
      count++;
      cacheData['hc0'] = this.state.hc0;
      formData.append("hc0",this.state.hc0);
    }
    if(this.state.hc1){
      count++;
      cacheData['hc1'] = this.state.hc1;
      formData.append("hc1",this.state.hc1);
    }
    if(this.state.hk0){
      count++;
      cacheData['hk0'] = this.state.hk0;
      formData.append("hk0",this.state.hk0);
    }
    if(this.state.hk1){
      count++;
      cacheData['hk1'] = this.state.hk1;
      formData.append("hk1",this.state.hk1);
    }
    if(this.state.hg0){
      count++;
      cacheData['hg0'] = this.state.hg0;
      formData.append("hg0",this.state.hg0);
    }
    if(this.state.hg1){
      count++;
      cacheData['hg1'] = this.state.hg1;
      formData.append("hg1",this.state.hg1);
    }
    if(count > 0){
      cacheList.unshift(cacheData);
    }
    AsyncStorage.setItem('cacheList', JSON.stringify(cacheList));
    this.props.navigation.navigate('gglist',{data:formData});
  }
  //清空输入
  clearInput () {
    this.setState({
      ry:[],
      pf:[],
      clmc:'',
      clxh:'',
      zwpp:'',
      qymc:'',
      dpxh:'',
      dpcj:'',
      zj0:'',
      zj1:'',
      zs:'',
      scdz:'',
      zwpp:'',
      rj0:'',
      rj1:'',
      qt:'',
      fdj:'',
      lts:'',
      ltgg:'',
      edzk:'',
      pc0:'',
      pc1:'',
      zzl0:'',
      zzl1:'',
      edzl0:'',
      edzl1:'',
      zbzl0:'',
      zbzl1:'',
      c0:'',
      c1:'',
      k0:'',
      k1:'',
      g0:'',
      g1:'',
      hc0:'',
      hc1:'',
      hk0:'',
      hk1:'',
      hg0:'',
      hg1:'',
    })
  }
  //赋值
  setPf = (val) => {
    this.setState({
      pf:val
    })
  } 
  setRy = (val) => {
    this.setState({
      ry:val
    })
  } 

  render() {
    return (
        <View style={styles.container}>
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <ScrollView 
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={this.state._keyboardDismissMode} //none
          >
            <View style={styles.group}>
              <Text style={styles.label}>车辆类型</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _clmc = TextInput }
                  underlineColorAndroid="transparent"
                  placeholder="例: 洒、洒水、洒水车..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                  onChangeText={(text) => this.setState({clmc:text})}
                  value={this.state.clmc}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>整车型号</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _clxh = TextInput }
                  onChangeText={(text) => this.setState({clxh:text})}
                  value={this.state.clxh}
                  underlineColorAndroid="transparent"
                  placeholder="例: clw5020..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>企业名称</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _qymc = TextInput }
                  onChangeText={(text) => this.setState({qymc:text})}
                  value={this.state.qymc}
                  underlineColorAndroid="transparent"
                  placeholder="例: 程力..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>底盘型号</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _dpxh = TextInput }
                  onChangeText={(text) => this.setState({dpxh:text})}
                  value={this.state.dpxh}
                  underlineColorAndroid="transparent"
                  placeholder="例: eq1253..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>底盘厂家</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _dpcj = TextInput }
                  onChangeText={(text) => this.setState({dpcj:text})}
                  value={this.state.dpcj} 
                  underlineColorAndroid="transparent"
                  placeholder="例: 东风..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>排放标准</Text>
              <PickerModel data={this.state.paifang} value={this.state.pf} setParm={this.setPf}></PickerModel>       
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>轴距</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _zj0 = TextInput } 
                  onChangeText={(text) => this.setState({zj0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zj0} 
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _zj1 = TextInput }
                  onChangeText={(text) => this.setState({zj1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zj1} 
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>轴数</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _zs = TextInput }
                  onChangeText={(text) => this.setState({zs:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zs}  
                  underlineColorAndroid="transparent"
                  placeholder="例: 3"
                  placeholderTextColor="#ccc"
                  style={styles.control}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>生产地址</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _scdz = TextInput }
                  onChangeText={(text) => this.setState({scdz:text})} 
                  value={this.state.scdz} 
                  underlineColorAndroid="transparent"
                  placeholder="例: 湖北省随州市..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>产品商标</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _zwpp = TextInput }
                  onChangeText={(text) => this.setState({zwpp:text})} 
                  value={this.state.zwpp} 
                  underlineColorAndroid="transparent"
                  placeholder="例: 程力威..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>罐体容积</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _rj0 = TextInput }
                  onChangeText={(text) => this.setState({rj0:text.replace(/[^\d.]/g, '')})} 
                  value={this.state.rj0} 
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _rj1 = TextInput }
                  onChangeText={(text) => this.setState({rj1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.rj1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>万能字段</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _qt = TextInput }
                  onChangeText={(text) => this.setState({qt:text})}
                  value={this.state.qt} 
                  underlineColorAndroid="transparent"
                  placeholder="例: 汽油..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>发动机</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _fdj = TextInput } 
                  onChangeText={(text) => this.setState({fdj:text})}
                  value={this.state.fdj}
                  underlineColorAndroid="transparent"
                  placeholder="例: YC4E160..."
                  placeholderTextColor="#ccc"
                  style={styles.control}
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>轮胎数</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _lts = TextInput }
                  onChangeText={(text) => this.setState({lts:text.replace(/[^\d.]/g, '')})}
                  value={this.state.lts}
                  underlineColorAndroid="transparent"
                  placeholder="例: 3"
                  placeholderTextColor="#ccc"
                  style={styles.control}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>轮胎规格</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _ltgg = TextInput }
                  onChangeText={(text) => this.setState({ltgg:text.replace(/[^\d.]/g, '')})}
                  value={this.state.ltgg}
                  underlineColorAndroid="transparent"
                  placeholder="例: 7.00"
                  placeholderTextColor="#ccc"
                  style={styles.control}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>燃油种类</Text>
              <PickerModel data={this.state.ranyou} value={this.state.ry} setParm={this.setRy} ></PickerModel>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>额定载客</Text>
              <View style={styles.rightContent}>
                <TextInput 
                  ref={ (TextInput) => _edzk = TextInput }
                  onChangeText={(text) => this.setState({edzk:text.replace(/[^\d.]/g, '')})}
                  value={this.state.edzk}
                  underlineColorAndroid="transparent"
                  placeholder="例: 3"
                  placeholderTextColor="#ccc"
                  style={styles.control}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>批次</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _pc0 = TextInput }
                  onChangeText={(text) => this.setState({pc0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.pc0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _pc1 = TextInput }
                  onChangeText={(text) => this.setState({pc1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.pc1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>总质量</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _zzl0 = TextInput }
                  onChangeText={(text) => this.setState({zzl0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zzl0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _zzl1 = TextInput }
                  onChangeText={(text) => this.setState({zzl1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zzl1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>额定质量</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _edzl0 = TextInput }
                  onChangeText={(text) => this.setState({edzl0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.edzl0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _edzl1 = TextInput }
                  onChangeText={(text) => this.setState({edzl1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.edzl1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>整备质量</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _zbzl0 = TextInput }
                  onChangeText={(text) => this.setState({zbzl0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zbzl0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _zbzl1 = TextInput }
                  onChangeText={(text) => this.setState({zbzl1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.zbzl1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>整车长度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _c0 = TextInput }
                  onChangeText={(text) => this.setState({c0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.c0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _c1 = TextInput }
                  onChangeText={(text) => this.setState({c1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.c1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>整车宽度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _k0 = TextInput }
                  onChangeText={(text) => this.setState({k0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.k0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _k1 = TextInput }
                  onChangeText={(text) => this.setState({k1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.k1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>整车高度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _g0 = TextInput }
                  onChangeText={(text) => this.setState({g0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.g0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _g1 = TextInput }
                  onChangeText={(text) => this.setState({g1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.g1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>货箱长度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _hc0 = TextInput }
                  onChangeText={(text) => this.setState({hc0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hc0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _hc1 = TextInput }
                  onChangeText={(text) => this.setState({hc1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hc1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>货箱宽度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _hk0 = TextInput }
                  onChangeText={(text) => this.setState({hk0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hk0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _hk1 = TextInput }
                  onChangeText={(text) => this.setState({hk1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hk1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>货箱高度</Text>
              <View style={styles.rightContent}>
                <TextInput
                  ref={ (TextInput) => _hg0 = TextInput }
                  onChangeText={(text) => this.setState({hg0:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hg0}
                  underlineColorAndroid='transparent'
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
                <Text style={styles.rightText}>到</Text>
                <TextInput
                  ref={ (TextInput) => _hg1 = TextInput }
                  onChangeText={(text) => this.setState({hg1:text.replace(/[^\d.]/g, '')})}
                  value={this.state.hg1}
                  underlineColorAndroid='transparent' 
                  style={styles.rightControl}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            <TouchableHighlight onPress={() => this.search()} style={styles.bottomClick} underlayColor='#000'>
              <View style={styles.bottomClick}>
                <Image source={Images.nav_gonggao} style={styles.bottomImage} />
                <Text style={styles.bottomText}>搜索</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.clearInput()} style={styles.bottomClick} underlayColor='#000'>
              <View style={styles.bottomClick}>
                <Image source={Images.del} style={styles.bottomImage}/>
                <Text style={styles.bottomText}>清除</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
  },
  contentContainer: {
    backgroundColor:'#eaeaea',
    paddingBottom:55,
  },
  group: {
    flexDirection:'row',
    marginTop:10,
  },
  label: {
    color:'#333',
    paddingLeft:15,
    fontSize:16,
    flex:2,
    lineHeight:36,
  },
  control: {
    height:36,
    borderWidth:0.5,
    borderColor:'#C9C8C7',
    backgroundColor:"#fff",
    fontSize:16,
    padding:5,
    flex:6,
    borderRadius:5,
  },
  rightContent:{
    flex:6,
    marginRight:10,
    flexDirection:'row',
    justifyContent: 'center',  
    alignItems:'center',
    height:36,
  },
  rightText:{
    flex:1,
    color:'#333',
    textAlign:'center',     
    justifyContent: 'center',
    fontSize:16,
  },
  rightControl:{
    flex:3,
    borderWidth:0.5,
    borderRadius:5,
    borderColor:'#C9C8C7',
    backgroundColor:"#fff",
    fontSize:16,
    padding:5,
  },
  bottom:{
    height: 50, 
    width: SCREEN_WIDTH, 
    backgroundColor:'#27232b',
    flexDirection:'row', 
    position: 'absolute', 
    top:SCREEN_HEIGHT-Bar-95,
    justifyContent:'center',
    alignItems:'center',
  },
  bottomClick:{
    flex:1,
    justifyContent: 'center', 
    alignItems:'center',
  },
  bottomImage:{
    height:24,
    width:24,
  },
  bottomText:{
    color:'#fff',
  }
});

export default connect(
  (state) => ({
    batch: state.common.batch,
    index: state.common.index
  })
)(Gonggao)