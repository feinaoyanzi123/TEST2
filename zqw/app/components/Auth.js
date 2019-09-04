import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';

class Auth extends Component {
	render () {
		return (
			<TouchableHighlight onPress={() => this._login()} underlayColor='rgba(255, 255, 255, 0)' style={{position:'absolute',right:10,top:30,}}>
				<View style={{backgroundColor:'rgba(0,0,0,0)',}}>
					<Image
			          style={styles.icon}
			          source={Images.login}
			        />
				</View>
			</TouchableHighlight>
		)
	}
	_login () {
		this.props.navigate(this.props.token ? 'setting':'member');
	}
}

const styles = StyleSheet.create({
	icon:{
		width:30,
		height:30,
	}
});
export default Auth;