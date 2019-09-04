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
  Modal
} from 'react-native';

class Explain extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:'内容加载中...'
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#27232b',
        height:0,
        paddingTop:Bar,
      },
    };
  }

  //请求
  fetchData(){
	let url = "http://xuanche.17350.com/api/app/chedaiexplain";
    fetch(url,{
      method: 'GET',
      headers:{
        'contentType': 'application/json'
      },
    })
	.then((response) => response.json())
	.then((responseData) => {
	    this.setState({
	      content:responseData.data
	    });
	})
	.catch((error) => {
	    this.setState({
	      content: error
	    })
	})
	.done();
  }

  componentDidMount () {
  	this.fetchData()
  }

  render() {
    return (
      <View style={{backgroundColor:'#fff',flex:1,}}>
      	<StatusBar translucent={true} backgroundColor={'transparent'}/>
      	<View style={{height:70,alignItems:'center',justifyContent:'center',borderColor:'#f8f8f8',borderWidth:1}}>
      		<Text style={{fontSize:16,color:'#333'}}>车贷贷款说明</Text>
      	</View>
      	<ScrollView>
      	  <View style={{padding:40,marginBottom:64}}>
    	    <Text style={{fontSize:16,color:'#333',lineHeight:30}}>{this.state.content}</Text>
    	  </View>
      	</ScrollView>
      	<View style={{
      		width:SCREEN_WIDTH,
      		backgroundColor:'#f8f8f8',
      		height:64,
      		alignItems:'center',
      		justifyContent:'center',
      		position: 'absolute',
		    bottom:0,
      		left:0
      	}}>
      	  <TouchableHighlight
	        underlayColor='rgba(255, 255, 255, 0)'
	        onPress={ () => this.props.navigation.goBack() }
	      >
      		<Image source={Images.closed} style={{width:32,height:32}} />
      	  </TouchableHighlight>
      	</View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
  },
  banner: {
    height:SCREEN_WIDTH*0.65,
  },
});

export default Explain