import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    BackHandler
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DrawerLayout from 'react-native-drawer-layout'
import Drawer from '../components/Drawer'
import Tab1 from './ceshi/Tab1'
import Tab2 from './ceshi/Tab2'
import Tab3 from './ceshi/Tab3'

export default class Tabnavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:1,
      drawerOpen:false,
      cartypeid:[],
      child2:null,
      isLoading:true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "专汽大讲堂",
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
        <Text
          onPress={ ()=> navigation.state.params.navigatePress()}
          style={{color:'#fff',fontSize:16,marginRight:20}}
        >筛选</Text>
      ),
    };
  }

  componentDidMount(){
    this.props.navigation.setParams({navigatePress:this.openDrawer.bind(this)});
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onDrawer);
    }
  }

  onDrawer = () => {
    if(this.state.drawerOpen){
      _DrawerLayout.closeDrawer();
      return true;
    }else{
      this.props.navigation.goBack();
      return true;
    }
  }

  //组件销毁结束监听
  componentWillUnmount(){
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onDrawer);
    }
  }

  openDrawer = () => {
    if(this.state.drawerOpen){
      _DrawerLayout.closeDrawer();
    }else{
      _DrawerLayout.openDrawer();
    }
  }

  _success = (param) =>{
    _DrawerLayout.closeDrawer();
    this.state.child.load(param);
    if(this.state.child2){
      this.state.child2.load(param);
    }
  }

  _tab = (child) => {
    this.setState({
      child:child
    });
  }

  _tab2 = (child) => {
    this.setState({
      child2:child
    });
  }

  render() {
    let drawerView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Drawer
          type={this.state.cartypeid} 
          success={this._success.bind(this)}>
        </Drawer>
      </View>
    );
    return (
      <DrawerLayout
        ref={(refs)=>{ _DrawerLayout = refs }}
        drawerWidth={SCREEN_WIDTH*0.8}
        drawerBackgroundColor="rgba(0,0,0,0.5)"
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => drawerView}
        onDrawerClose={()=>{
          this.setState({
            drawerOpen:false
          })
        }}
        onDrawerOpen={()=>{
          this.setState({
            drawerOpen:true
          })
        }}
      >
        <ScrollableTabView
          tabBarPosition="top"
          tabBarActiveTextColor="#FD6E5D"
          tabBarUnderlineStyle={{backgroundColor:'#FD6E5D',height:1}}
          style={{height:36,backgroundColor:'#fff'}}
          tabBarTextStyle={{fontSize:16,}}
        >
          <Tab1 
            tab={this._tab.bind(this)}
            tabLabel="销售技巧">
          </Tab1>
          <Tab2
            tabLabel="销售流程">
          </Tab2>
          <Tab3
            tab2={this._tab2.bind(this)}
            tabLabel="车型介绍">
          </Tab3>
        </ScrollableTabView>
      </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //position:'relative'
    },
});