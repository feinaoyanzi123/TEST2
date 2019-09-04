import React, {
	Component
} from 'react';
import {
	StatusBar,
	StyleSheet,
	Image,
	Text,
	View,
	Button,
	ListView,
	TouchableHighlight,
	AsyncStorage,
	ScrollView,
	WebView,
	Platform,
	BackHandler
} from 'react-native';
import Swiper from 'react-native-swiper';

class PeiJianInfo extends Component {
	constructor(props) {
		super(props);
		this.nav = this.props.navigation;//导航
	  	// 添加返回键监听(对Android原生返回键的处理)
	  	this.addBackAndroidListener(this.nav);
		this.state = {
			list: [],
			error: '暂无数据'
		};
	}

	static navigationOptions = ({
		navigation
	}) => {
		return {
			title: navigation.getParam('title', '配件详情'),
			headerStyle: {
				backgroundColor: '#27232b',
				height: 45 + Bar,
				paddingTop: Bar
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: 'white',
				//设置标题的大小
				fontSize: 18,
				//居中显示
				flex: 1,
				textAlign: 'center',
			},
			headerRight: (
				<View/>
			),
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

	//请求
	fetchData(url) {
		fetch(url, {
			method: 'GET',
			headers: {
				'contentType': 'application/json'
			},
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				list: responseData.data.pictures,
				title: responseData.data.jieshao,
				content: responseData.data.content
			});
		})
		.catch((error) => {
			this.setState({
				list: [],
				error: error
			})
		})
		.done();
	}

	componentDidMount() {
		let id = this.props.navigation.state.params.id;
		let url = 'http://xuanche.17350.com/api/wechat/peijianInfo?id=' + id;
		this.fetchData(url);
	}

	renderSwiper() {
		let itemArr = [];
		for (var i = 0; i < this.state.list.length; i++) {
			let data = this.state.list[i];
			itemArr.push(
				<View style={styles.slide} key={i}>
					<Image style={styles.images} source={{uri:data['url']}}/>
					<View style={styles.desc}>
						<Text style={styles.text} numberOfLines={1}>{data['alt']}</Text>
					</View>
				</View>
			)
		}
		return itemArr;
	}

	render() {
		const renderPagination = (index, total, context) => {
			return (
				<View style={styles.paginationStyle}>
			        <Text style={styles.paginationText}>{index + 1} / {total}</Text>
			    </View>
			)
		}
		return (
			<View style={{height:SCREEN_HEIGHT}}>
				<View style={{height: (SCREEN_WIDTH-20) * 0.65 + 70}}>
				{
					this.state.list.length == 0 ?
					<View style={styles.wrapper}><Text>{this.state.error}</Text></View>
					:
					<Swiper
			          style={styles.wrapper}
			          renderPagination={renderPagination}
			          loop={true}
			          autoplay={true}
			          autoplayTimeout={5}   
			        >
			        {this.renderSwiper()}
			        </Swiper>
				}
				</View>
				<View style={styles.shop}>
					<Text style={styles.shopkey}>商品简介</Text>
					<Text style={styles.shopcontent}>{this.state.title}</Text>
					<Text style={styles.param}>具体参数</Text>
				</View>
				<WebView
					style={styles.webviews}
					originWhitelist={['*']}
		        	source={{html: this.state.content,baseUrl:''}}
		     	/>
	        </View>
		)
	}
}
const styles = StyleSheet.create({
	wrapper: {
		position: 'relative',
		width: SCREEN_WIDTH-20,
		margin: 10,
		height: (SCREEN_WIDTH-20) * 0.65 + 40,
	},
	images: {
		width: SCREEN_WIDTH-20,
		height: (SCREEN_WIDTH-20) * 0.65,
	},
	desc: {
		backgroundColor: '#2e2e2e',
		paddingLeft: SCREEN_WIDTH * 0.2 + 20,
		height: 40,
	},
	text: {
		lineHeight: 40,
		color: '#fff',
		fontSize: 18,
	},
	paginationStyle: {
		position: 'absolute',
		top: (SCREEN_WIDTH-20) * 0.65 + 10,
		marginLeft: 10,
		backgroundColor: '#ff6e5d',
		width: SCREEN_WIDTH * 0.2,
		height: 40,
	},
	paginationText: {
		color: '#fff',
		fontSize: 20,
		lineHeight: 40,
		textAlign: 'center',
	},
	shop: {
		height: 150,
		paddingLeft: 10
	},
	shopcontent:{
		fontSize: 14,
		color: '#666'
	},
	shopkey: {
		color: '#333',
		fontSize: 18,
	},
	param: {
		color: '#333',
		fontSize: 18,
		paddingTop: 10
	},
	webviews: {
		backgroundColor: '#e9e9ef',
	}
});

export default PeiJianInfo