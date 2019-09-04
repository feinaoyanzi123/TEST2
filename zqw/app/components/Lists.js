import React, {
	Component
} from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	Image,
} from 'react-native';

class Lists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: [{
				'icon': Images.gonggao,
				'title': '公告',
				'desc': '45万个车型',
				'url': 'gonggao'
			}, {
				'icon': Images.baojia,
				'title': '报价',
				'desc': '厂家报价及时更新',
				'url': 'baojia'
			}, {
				'icon': Images.shipin,
				'title': '视频',
				'desc': '专汽大讲堂',
				'url': 'shipin'
			}, {
				'icon': Images.pinpai,
				'title': '品牌',
				'desc': '行业知名品牌推荐',
				'url': 'pinpai'
			}, {
				'icon': Images.pingce,
				'title': '评测',
				'desc': '热门车型全方位评测',
				'url': 'pingce'
			}, {
				'icon': Images.chedai,
				'title': '车贷',
				'desc': '可全国落户',
				'url': 'chedai'
			}, {
				'icon': Images.tuku,
				'title': '图库',
				'desc': '车型方位高清图片',
				'url': 'tuku'
			}, {
				'icon': Images.peijian,
				'title': '配件商城',
				'desc': '原厂正品配件',
				'url': 'peijian'
			}, {
				'icon': Images.fuwuzhan,
				'title': '服务站',
				'desc': '底盘维修服务站',
				'url': 'fuwu'
			}]
		};
	}
	render() {
		//菜单列表
		let menuTop = this.state.menu.map((value, i) => {
			if (i < 3) {
				return (
					<TouchableHighlight key={i} style={styles.lists} onPress={ () => this._send(value.url) } underlayColor='#fff'>
						<View>
							<View style={styles.images}>
							    <Image
						          style={styles.icon}
						          source={value.icon}
						        />
						    </View>
							<Text style={styles.desc}>{value.desc}</Text>
							<Text style={styles.title}>{value.title}</Text>
						</View>
					</TouchableHighlight>
				)
			}
		})
		let menuMiddle = this.state.menu.map((value, i) => {
			if (i > 2 && i < 6) {
				return (
					<TouchableHighlight key={i} style={styles.lists} onPress={ () => this.props.navigate(value.url) } underlayColor='#fff'>
						<View>
							<View style={styles.images}>
							    <Image
						          style={styles.icon}
						          source={value.icon}
						        />
						    </View>
							<Text style={styles.desc}>{value.desc}</Text>
							<Text style={styles.title}>{value.title}</Text>
						</View>
					</TouchableHighlight>
				)
			}
		})
		let menuBottom = this.state.menu.map((value, i) => {
			if (i > 5) {
				return (
					<TouchableHighlight key={i} style={styles.lists} onPress={ () => this.props.navigate(value.url) } underlayColor='#fff'>
						<View>
							<View style={styles.images}>
							    <Image
						          style={styles.icon}
						          source={value.icon}
						        />
						    </View>
							<Text style={styles.desc}>{value.desc}</Text>
							<Text style={styles.title}>{value.title}</Text>
						</View>
					</TouchableHighlight>
				)
			}
		})
		return (
			<View>
				<View style={{flexDirection:'row'}}>
					{menuTop}
				</View>
				<View style={{flexDirection:'row'}}>
					{menuMiddle}
				</View>
				<View style={{flexDirection:'row'}}>
					{menuBottom}
				</View>
			</View>
		)
	}

	_send(url) {
		if (url == 'baojia' || url == 'shipin') {
			this.props.navigate(this.props.token ? url : 'member');
		} else {
			this.props.navigate(url);
		}

	}
}

const styles = StyleSheet.create({
	lists: {
		flex: 1,
		height: (SCREEN_HEIGHT - SCREEN_WIDTH * 0.65) / 3,
		justifyContent: 'center',
		borderColor: '#eaeaea',
		borderWidth: 1,
		borderRadius: 8,
		borderStyle: 'solid',
	},
	images: {
		alignItems: 'center',
	},
	icon: {
		width: 50,
		height: 50,
	},
	desc: {
		textAlign: 'center',
		color: '#999',
		fontSize: 8,
		marginTop: 5,
	},
	title: {
		textAlign: 'center',
		color: '#333',
		fontSize: 16,
		marginTop: 3,
	}
});
export default Lists;