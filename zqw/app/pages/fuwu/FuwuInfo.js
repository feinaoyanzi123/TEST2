import React, {
	Component
} from 'react';
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

class TuKuInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		};
	}

	static navigationOptions = ({
		navigation
	}) => {
		return {
			title: navigation.getParam('title', '图库详情'),
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
					list: responseData.data
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
		let url = 'http://xuanche.17350.com/api/wechat/photoInfo?id=' + id;
		this.fetchData(url);
	}

	render() {
		let photo = this.state.list.map((value, i) => {
			return (
				<View key={i} style={styles.item}>
					<View style={styles.photo}>
					    <Image source={{uri:value.url}} style={styles.images}/>
				    </View>
					<Text style={styles.alts}>{value.alt}</Text>
				</View>
			)
		})
		return (
			<View style={{backgroundColor:'#fff',flex:1,}}>
		      	<StatusBar translucent={true} backgroundColor={'transparent'}/>
		      	<ScrollView>
		      	  <View style={styles.list}>
		    	    {photo}
		    	  </View>
		      	</ScrollView>
		    </View>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		paddingLeft: 7.5,
		paddingTop: 12,
		display: 'flex',
		flexDirection: 'column',
	},
	item: {
		flex: 1,
	},
	photo: {
		height: SCREEN_WIDTH * 0.65,
	},
	alts: {
		textAlign: 'left',
		lineHeight: 30,
		color: '#333',
	},
	images: {
		width: SCREEN_WIDTH - 15,
		height: SCREEN_WIDTH * 0.65,
		borderRadius: 3,
	}
});

export default TuKuInfo