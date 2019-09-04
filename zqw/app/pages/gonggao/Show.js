import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  Image 
} from 'react-native';
import { 
  createTabNavigator, 
  createStackNavigator 
} from 'react-navigation';
import Tab1 from './ZhenChe';
import Tab2 from './DiPan';
import Tab3 from './MianZheng';
import Tab4 from './RanYou';
import Tab5 from './HuanBao';

const Tab = createTabNavigator({
    Tab1: {
      screen:Tab1,
      navigationOptions: {
        tabBarLabel: '整车',
        tabBarIcon: (({tintColor, focused}) => (
          <Image source={Images.g1} style={{width:25,height:25}}/>
        )),
        tabBarOnPress: (()=>{}),
        navigationOptions: () => ({
          title: `A`,
          headerBackTitle: null
        }),
      },
    },
    Tab2:{
      screen:Tab2,
      navigationOptions:{
        tabBarLabel: '底盘',
        tabBarIcon: (({tintColor, focused}) => (
          <Image source={Images.g2} style={{width:25,height:25}}/>
        )),
        tabBarOnPress: (()=>{})
      }
    },
    Tab3:{
      screen:Tab3,
      navigationOptions:{
        tabBarLabel: '免征',
        tabBarIcon: (({tintColor, focused}) => (
          <Image source={Images.g3} style={{width:18,height:18}}/>
        )),
        tabBarOnPress: (()=>{})
      }
    },
    Tab4:{
      screen:Tab4,
      navigationOptions:{
        tabBarLabel: '燃油',
        tabBarIcon: (({tintColor, focused}) => (
          <Image source={Images.g4} style={{width:18,height:18}}/>
        )),
        tabBarOnPress: (()=>{})
      }
    },
    Tab5:{
      screen:Tab5,
      navigationOptions:{
        tabBarLabel: '环保',
        tabBarIcon: (({tintColor, focused}) => (
          <Image source={Images.g5} style={{width:18,height:18}}/>
        )),
        tabBarOnPress: (()=>{})
      }
    }
  },
  {
    tabBarPosition:'bottom',//位置
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#4BC1D2',
      inactiveTintColor: '#fff',
      showIcon: true,
      showLabel: true,
      style: {
        height: 45,
        backgroundColor: '#000',
      },
      iconStyle:{
        marginTop:-8,
      },
      labelStyle: {
        fontSize: 14,
        marginTop:-2,
      },
      indicatorStyle:{
        height:0,
      }
    },
    backBehavior: 'none',
  }
);

export default Tab