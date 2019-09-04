import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StatusBar,
  Platform,
  BackHandler
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import login from './member/Login';
import reg from './member/Reg';

const MemberPage = createMaterialTopTabNavigator(
  {
    '登录': { screen: login },
    '注册': { screen: reg },
  },
  {
    tabBarOptions: {
      activeTintColor: '#F08C14',
      inactiveTintColor: '#000',
      showIcon: false,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#F08C14',
      pressOpacity: 0.8,
      tabStyle:{
        backgroundColor:'#fff',
      },
      style: {
        backgroundColor: '#ccc',
      },
      labelStyle: {
        fontSize: 16,
        margin: 1,
      },
      indicatorStyle: { 
        height: 2, 
        backgroundColor: '#F08C14' 
      },
    },
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: false,
    backBehavior: 'none',
  }
);

export default MemberPage