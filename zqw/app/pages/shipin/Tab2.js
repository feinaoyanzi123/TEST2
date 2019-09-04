import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

class Tab2 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation,screenProps}) => ({
    tabBarOnPress: async (obj: any) => {
      obj.defaultHandler();
    }
  });

  componentDidMount(){
    //alert('开始')
  }

  componentWillUnmount(){
    //alert('结束')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar translucent={false} backgroundColor='#000'/>
        <Image source={Images.sell} style={styles.backgroundImage}/>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:SCREEN_WIDTH,
    height:SCREEN_WIDTH*2.3,
  }
});
export default Tab2