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

class Estimate extends Component {
  constructor(props){
    super(props);
    this.state = {
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

  render() {
    return (
      <View style={{backgroundColor:'#fff',flex:1,}}>
      	<StatusBar translucent={true} backgroundColor={'transparent'}/>
      	<View style={{height:70,alignItems:'center',justifyContent:'center',borderColor:'#f8f8f8',borderWidth:1}}>
      		<Text style={{fontSize:16,color:'#333'}}>预估贷款总价</Text>
      	</View>
      	<ScrollView>
      	  <View style={{padding:40,marginBottom:64}}>
    	    <Text style={{fontSize:16,color:'#333'}}>
    	    	1.首付=裸车价*首付比例
    	    </Text>
    	    <Text style={{fontSize:16,color:'#333'}}>
    	    	2.月供=贷款金额/期数+贷款金额*利率
    	    </Text>
    	    <Text style={{fontSize:16,color:'#333'}}>
    	    	3.预计贷款总价=车辆价格+必要花费+总利息(月利息*期数)
    	    </Text>
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

export default Estimate