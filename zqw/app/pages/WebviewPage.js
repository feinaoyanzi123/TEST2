import React, { Component } from 'react';
import { 
	Animated, 
	Easing, 
	View, 
	Image, 
	Text, 
	ProgressBarAndroid, 
	AppRegistry, 
	StyleSheet, 
	TouchableHighlight,
	Platform,
	BackHandler,
  StatusBar,
  //WebView
} from 'react-native';
import WebView from 'react-native-android-fullscreen-webview-video';
import ShareShow from '../components/ShareShow';
import resolveAssetSource from 'resolveAssetSource';

class Webview extends Component {
  constructor(props:any) {
    super(props);
    this.nav = this.props.navigation;//导航
  	// 添加返回键监听(对Android原生返回键的处理)
  	this.addBackAndroidListener(this.nav);
    //使用Animated.Value设定初始化值（缩放度，角度等等）
    this.state = {
        show:false,
        shareshow:null,
        bounceValue: new Animated.Value(1), //你可以改变这个值看
        //看效果是什么
        rotateValue: new Animated.Value(0),//旋转角度的初始值
        //开关
        isPlaying: true,
    };
  }

  onBackAndroid = () => {
    //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      _webview.goBack();
      return true;
    } else {
    	this.nav.goBack();
	    // if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
	    //     //最近1秒内按过back键，可以退出应用。
	    //     return false;
	    // }
        //this.lastBackPressed = Date.now();
        // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }
  };

  componentDidMount () {
    this.props.navigation.setParams({navigatePress:this.share});
  }

  // 监听原生返回键事件
  addBackAndroidListener(navigator) {
    if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  //组件销毁结束监听
  componentWillUnmount(){
  	if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  share = ()=>{
    this.state.shareshow.closeModal(true)
  }

  callBack = (call) =>{
    this.setState({
      shareshow:call
    })
  }

  startAnimation() {
    this.state.bounceValue.setValue(1);//和上面初始值一样，所以
    //弹动没有变化
    this.state.rotateValue.setValue(0);
    Animated.parallel([
        //通过Animated.spring等函数设定动画参数
        //可选的基本动画类型: spring, decay, timing
        Animated.spring(this.state.bounceValue, {
            toValue: 1,      //变化目标值，也没有变化
            friction: 20,    //friction 摩擦系数，默认40
        }),
        Animated.timing(this.state.rotateValue, {
            toValue: 1,  //角度从0变1
            duration: 2000,  //从0到1的时间
            easing: Easing.out(Easing.linear),//线性变化，匀速旋转
        }),
        //调用start启动动画,start可以回调一个函数,从而实现动画循环
    ]).start(()=> this.state.isPlaying && this.startAnimation());
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('setTitle', '加载中...'),
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
        <TouchableHighlight 
          onPress={() => {navigation.state.params.navigatePress(true)}} 
          underlayColor='rgba(255, 255, 255, 0)'
          style={{marginRight:20}}
        >
          <Image source={Images.nav_share} style={{width:25,height:25}}/>
        </TouchableHighlight>    
      ),
    };
  }

  render() {
    return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
      <ShareShow
        show={this.state.show}
        callBack={this.callBack.bind(this)}
        title={this.props.navigation.state.params.setTitle}
        description={this.props.navigation.state.params.setTitle}
        webpageUrl={this.props.navigation.state.params.url}
        thumbImage={resolveAssetSource(Images.logo).uri}
      >
      </ShareShow>
      <WebView
        ref={(WebView)=>{ _webview = WebView }}
        startInLoadingState={false}
        source={{uri: this.props.navigation.state.params.url}}
        onNavigationStateChange={(event)=>{
        	this.props.navigation.setParams({setTitle: event.loading ? '加载中...' : event.title });
        	this.setState({
		        backButtonEnabled: event.canGoBack
		    });
        }}
        onLoadEnd={()=>{
        	this.setState({
		  		isPlaying: false,
		  	});
        }}
        onLoadStart={()=>{
        	this.setState({
		  		isPlaying: true,
		  	});
        	//在初始化渲染执行之后立刻调用动画执行函数
    		this.startAnimation();
        }}
        renderLoading={(prop)=>{
        	return (
		      <View style={styles.container}>
		        <ProgressBarAndroid indeterminate={true} color="#2196F3"/>
		      </View>
		    )}
        }
      />
      <View style={styles.bottomMenu}>
        <TouchableHighlight onPress={() => _webview.goBack()} style={styles.bottomClick} underlayColor='#000'>
	      	<View style={styles.bottomClick}>
	      		<Image source={Images.topbar_back} style={styles.image} />
	            <Text style={styles.bottomText}>后退</Text>
	      	</View>
      	</TouchableHighlight>
      	<TouchableHighlight onPress={() => _webview.goForward()} style={styles.bottomClick} underlayColor='#000'>
	      	<View style={styles.bottomClick}>
	      		<Image source={Images.topbar_next} style={styles.image} />
	            <Text style={styles.bottomText}>前进</Text>
	      	</View>
      	</TouchableHighlight>
      	<TouchableHighlight onPress={() => this.state.isPlaying ? _webview.stopLoading():_webview.reload()} style={styles.bottomClick} underlayColor='#000'>
	      	<View style={styles.bottomClick}>
	      	    <Animated.Image 
	      	    source={Images.nav_refresh}
			        ref={(Animated)=>{_Animated = Animated}}
			        style={{
			          width:24,
			          height: 24, //图片变园
			          transform: [
			        	//将初始化值绑定到动画目标的style属性上
			        	{scale: this.state.bounceValue},
			        	//使用interpolate插值函数,实现了从数值单位的映
			        	//射转换,上面角度从0到1，这里把它变成0-360的变化
			        	{rotateZ: this.state.rotateValue.interpolate({
			        		inputRange: [0,1],
			        		outputRange: ['0deg', '360deg'],
			        	})},
			          ]
			        }}>
			    </Animated.Image>
	            <Text style={styles.bottomText}>{this.state.isPlaying ? '停止':'刷新'}</Text>
	      	</View>
      	</TouchableHighlight>
      	<TouchableHighlight onPress={() => this.goHome()} style={styles.bottomClick} underlayColor='#000'>
	      	<View style={styles.bottomClick}>
	      		<Image source={Images.home} style={styles.bottomImage} />
	            <Text style={styles.bottomText}>主页</Text>
	      	</View>
      	</TouchableHighlight>
      </View>
    </View>
    );
  }

  //用新的路线代替当前路线
  goHome(){
  	this.props.navigation.replace('web',{url:this.props.navigation.state.params.url});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bottomMenu: {
  	height: 50, 
    width: SCREEN_WIDTH, 
    backgroundColor:'#333',
    flexDirection:'row', 
    position: 'relative', 
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
  },
  bottomClick:{
    flex:1,
    justifyContent: 'center', 
    alignItems:'center',
  },
  image:{
  	height:18,
    width:10,
    marginTop:3,
    marginBottom:3,
  },
  bottomImage:{
    height:24,
    width:24,
  },
  bottomText:{
    color:'#fff',
  }
});


export default Webview;