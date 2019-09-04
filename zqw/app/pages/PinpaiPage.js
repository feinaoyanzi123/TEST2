import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Placeholder from 'rn-placeholder';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Pinpai extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: 10,
      isLoading: true,//网络请求状态
      error: false,
      errorInfo: "",
      dataSource: ds.cloneWithRows([]),
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "品牌专区",
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
        <View/>
      ),
    };
  }

  componentWillMount(){
    let url = "http://xuanche.17350.com/api/app/pingpai";
    this.fetchData(url);
  }

  fetchData(url){
    fetch(url,{
      method: 'GET',
      headers:{
        'contentType': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(json.data)
      });
    })
    .catch((error) => {
      this.setState({
        error: true,
        errorInfo: error
      })
    })
  }

  renderData() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
          </View>
      </View>
    )
  }

  //加载等待页
  renderLoadingView() {
    const PlaceholderContent = [];
    for (let key = 0; key < this.state.rows; key++) {
      PlaceholderContent.push(
        <View style={{marginBottom:20}} key={`PlaceholderContentKey${key}`}>
          <Placeholder.ImageContent
            size={80}
            textSize={16}
            lineNumber={2}
            lineSpacing={10}
            width="100%"
            lastLineWidth="70%"
            firstLineWidth="50%"
          >
          </Placeholder.ImageContent>
        </View>,
      );
    }
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{backgroundColor:'#FFFFFF', padding:20}}>
            {PlaceholderContent}
        </ScrollView>
      </View>
    );
  }

  //加载失败view
  renderErrorView() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Text>
          加载失败
        </Text>
      </View>
    );
  }

  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }

  renderRow(rowData){
    return(
    	<TouchableHighlight onPress={() => this._pressRow(rowData.url)} underlayColor='rgba(255, 255, 255, 0)'>
        <View style={styles.itemStyle}>
        	<View style={styles.imageStyle}>
        		<Image source={{uri:rowData.img}} style={{width:75,height:75,}}/>
        	</View>
            <View style={styles.subItemStyle}>
                <Text style={{fontSize:16,color:'#333',marginBottom:5,}}>{rowData.title}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:5,}}>{rowData.desc}</Text>
            </View>
            <View style={styles.nextStyle}>
            	<Image source={Images.topbar_next_BBB} style={{width:15,height:24}}/>
        	</View>
        </View>
        </TouchableHighlight>
    );
  }

  _pressRow(url){
  	this.props.navigation.navigate('web',{url:url});
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
  },
  itemStyle: {
      flexDirection:'row',
      borderWidth:1,
      borderColor:'#ccc',
      borderRadius:5,
      margin: 10,
      backgroundColor:'#fff',
      height:120,
  },
  imageStyle: {
      justifyContent:'center',
  	alignItems:'center',
      flex:2,
      marginLeft:10,
      marginRight:10,
  },
  subItemStyle: {
      justifyContent:'center',
      flex:4,
  },
  nextStyle: {
  	flex:1,
  	justifyContent:'center',
  	alignItems:'center',
  }
});
export default Pinpai