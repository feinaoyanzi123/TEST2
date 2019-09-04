import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List, Picker } from 'antd-mobile-rn';

const CustomChildren = (props: any) => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={styles.child}>
      <Text style={styles.childText}>{props.extra}</Text>
    </View>
  </TouchableOpacity>
);

export default class PickerModel extends Component {
  constructor(props:any) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Picker 
          extra="不限"
          data={this.props.data} 
          cols={1}
          value={this.props.value}
          onChange={this.props.setParm}
        >
          <CustomChildren></CustomChildren>
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding:0,
    margin:0,
    marginRight:10,
    marginLeft:-3,
    flex:6,
  },
  child:{
    height: 36, 
    borderRadius:5, 
    borderColor:'#C9C8C7', 
    borderWidth:0.5, 
    paddingLeft: 18, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff'
  },
  childText:{
    color: '#000', 
    fontSize: 16,
  }
})  
