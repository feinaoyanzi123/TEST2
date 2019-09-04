import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import Back from 'react-navigation/src/views/assets/back-icon.png';

class Header extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      let rightView=(
        <View style={{marginRight:52}}/>
      )
      if(this.props.rTitle){
        rightView=(
          <Text style={styles.rTitle} onPress={ this.props.handle }>
            {this.props.rTitle}
          </Text>
        )
      }
      return (
        <View style={styles.header}>
          <TouchableHighlight 
            onPress={() => this._goBack() } 
            underlayColor='#303030'
          >
            <Image
              style={styles.image}
              source={Back}
            />
          </TouchableHighlight>
          <Text style={styles.title}>{this.props.title}</Text>
          {rightView}
        </View>
      )
    }

    _goBack(){
      this.props.navigation.goBack();
    }
}


const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      backgroundColor: '#333',
      backgroundColor: '#27232b',
      height:(45+Bar),
      paddingTop:Bar,
      width:SCREEN_WIDTH,
      alignItems:'center',
      justifyContent:'center',
    },
    image: {
      width: 24, 
      height: 24, 
      tintColor:'#fff',
      margin:16,
    },
    title: {
      color: 'white',
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
    },
    rTitle:{
      color:'#fff',
      fontSize:16,
      marginRight:20,
    }
});

export default Header