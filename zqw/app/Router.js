import React, {
	Component
} from 'react';
import {
	Easing,
	Animated,
	Settings,
	StatusBar,
	View,
	Text
} from 'react-native';
import {
	createStackNavigator
} from 'react-navigation';
import StyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
//页面
import IndexPage from './pages/IndexPage'
import GonggaoPage from './pages/GonggaoPage'
import GonggaoList from './pages/gonggao/List'
import GonggaoIndex from './pages/gonggao/Index'
import GonggaoShow from './pages/gonggao/Show'
import HBContent from './pages/gonggao/HBContent'
import RYContent from './pages/gonggao/RYContent'
import Edit from './pages/gonggao/Edit'
import BaojiaPage from './pages/BaojiaPage'
import BJindex from './pages/baojia/BJindex'
import BJlist from './pages/baojia/BJlist'
import BJshow from './pages/baojia/BJshow'
import DPindex from './pages/baojia/DPindex'
import DPlist from './pages/baojia/DPlist'
import DPshow from './pages/baojia/DPshow'
import DPview from './pages/baojia/DPview'
import ShipinPage from './pages/ShipinPage'
import PinpaiPage from './pages/PinpaiPage'
import PingcePage from './pages/PingcePage'
import PingceView from './pages/PingceView'
import ChedaiPage from './pages/ChedaiPage'
import TukuPage from './pages/TukuPage'
import TukuInfo from './pages/tuku/TukuInfo'
import PeijianPage from './pages/PeijianPage'
import PeijianInfo from './pages/peijian/PeijianInfo'
import FuwuPage from './pages/FuwuPage'
import FuwuInfo from './pages/fuwu/FuwuInfo'
import ChedaiExplain from './pages/chedai/Explain'
import ChedaiEstimate from './pages/chedai/Estimate'
import MemberPage from './pages/MemberPage'
import MemberIndexPage from './pages/member/Index'
import MemberInfoPage from './pages/member/Info'
import MemberEditInfoPage from './pages/member/EditInfo'
import MemberEditPassPage from './pages/member/EditPass'
import MemberHelp from './pages/member/Help'
import MemberHelpShow from './pages/member/HelpShow'
import MemberAbout from './pages/member/About'
import MemberAboutShow from './pages/member/AboutShow'
import WebviewPage from './pages/WebviewPage'
import ceshi from './pages/ceshi'
import DrawerComponent from './components/Drawer'
//动画
const TransitionConfiguration = () => ({
	screenInterpolator: (sceneProps) => {
		const {
			scene
		} = sceneProps;
		const {
			route
		} = scene;
		const params = route.params || {};
		const transition = params.transition || 'forHorizontal';
		return StyleInterpolator.forHorizontal(sceneProps);
	},
});

const Router = createStackNavigator({
	Index: {
		screen: IndexPage
	},
	gonggao: {
		screen: GonggaoPage
	},
	gglist: {
		screen: GonggaoList
	},
	ggindex: {
		screen: GonggaoIndex
	},
	ggshow: {
		screen: GonggaoShow,
		navigationOptions: ({
			navigation
		}) => ({
			title: `${navigation.state.params.title}${navigation.state.params.code}`,
			headerStyle: {
				backgroundColor: '#333',
				height: (45 + Bar),
				paddingTop: Bar,
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
	          style={{color:'#fff',fontSize:16,marginRight:20}}
	          onPress={()=> navigation.navigate('edit')}
	        >编辑</Text>
			),
		})
	},
	hbContent: {
		screen: HBContent
	},
	ryContent: {
		screen: RYContent
	},
	edit: {
		screen: Edit
	},
	baojia: {
		screen: BaojiaPage
	},
	bjindex: {
		screen: BJindex
	},
	bjlist: {
		screen: BJlist
	},
	bjshow: {
		screen: BJshow
	},
	dpindex: {
		screen: DPindex
	},
	dplist: {
		screen: DPlist
	},
	dpshow: {
		screen: DPshow
	},
	dpview: {
		screen: DPview
	},
	shipin: {
		screen: ShipinPage
	},
	pinpai: {
		screen: PinpaiPage
	},
	pingce: {
		screen: PingcePage
	},
	pcview: {
		screen: PingceView
	},
	chedai: {
		screen: ChedaiPage
	},
	tuku: {
		screen: TukuPage
	},
	tukuinfo: {
		screen: TukuInfo
	},
	peijian: {
		screen: PeijianPage
	},
	peijianinfo: {
		screen: PeijianInfo
	},
	fuwuinfo:{
		screen:FuwuInfo
	},
	fuwu: {
		screen: FuwuPage
	},
	explain: {
		screen: ChedaiExplain
	},
	estimate: {
		screen: ChedaiEstimate
	},
	member: {
		screen: MemberPage,
		navigationOptions: ({
			navigation
		}) => ({
			title: "登录/注册",
			headerStyle: {
				backgroundColor: '#27232b',
				height: (45 + Bar),
				paddingTop: Bar
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
		})
	},
	setting: {
		screen: MemberIndexPage
	},
	minfo: {
		screen: MemberInfoPage
	},
	editinfo: {
		screen: MemberEditInfoPage
	},
	editpass: {
		screen: MemberEditPassPage
	},
	help: {
		screen: MemberHelp
	},
	helpshow: {
		screen: MemberHelpShow
	},
	about: {
		screen: MemberAbout
	},
	aboutshow: {
		screen: MemberAboutShow
	},
	web: {
		screen: WebviewPage
	},
	ceshi: {
		screen: ceshi
	},
}, {
	initialRouteName: 'Index',
	navigationOptions: {
		gesturesEnabled: true,
		gestureResponseDistance: {
			horizontal: 35
		},
	},
	transitionConfig: TransitionConfiguration,
});

export default Router