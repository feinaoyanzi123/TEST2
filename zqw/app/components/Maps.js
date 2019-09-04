import React, {
	Component
} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Modal,
	TouchableOpacity,
	Linking
} from 'react-native';
import RoutePlan from '../common/RoutePlan'

class Maps extends Component {
	constructor(props){
	    super(props)
	    this.state = {
	        modalVisible:false,
	    }
	}

	showModal = (lat,lng,address) => {
        this.setState({
            modalVisible: true,
            toLat: lat,
		    toLng: lng,
		    toAddress: address
        });
    }
	
	cancelModal(){
	    this.setState({modalVisible:false})
	}
		
	gd(){
		RoutePlan.isInstallAmap()
		.then(
			(res) => {
				if(res){
					RoutePlan.openAmap({
                        slat: this.props.lat, slon: this.props.lng, sname: "我的位置",
                        dlat: this.state.toLat, dlon: this.state.toLng, dname: this.state.toAddress,
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
				}else{
					Linking.openURL("https://uri.amap.com/navigation?from="+this.props.lng+","+this.props.lat+",我的位置&to="+this.state.toLng+","+this.state.toLat+","+this.state.toAddress+"&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0");
				}
			}
		)
		.catch(err => alert(err))
	}

	tx(){
		RoutePlan.isInstallQQMap()
		.then(
			(res) => {
				if(res){
					RoutePlan.openQQMap({
                       slat: this.props.lat, slon: this.props.lng, sname: "我的位置",
                        dlat: this.state.toLat, dlon: this.state.toLng, dname: this.state.toAddress,
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
				}else{
					Linking.openURL("https://pr.map.qq.com/j/tmap/download?key=YourKey");
				}
			}
		)
		.catch(err => alert(err))
	}

	bd(){
		RoutePlan.isInstallBaiDuMap()
		.then(
			(res) => {
				if(res){
					RoutePlan.openBaiDuMap({
                        slat: this.props.lat, slon: this.props.lng, sname: "我的位置",
                        dlat: this.state.toLat, dlon: this.state.toLng, dname: this.state.toAddress,
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
				}else{
					Linking.openURL("http://api.map.baidu.com/direction?origin=latlng:"+this.props.lat+","+this.props.lng+"|name:我的位置&destination="+this.state.toAddress+"&mode=driving&region="+this.state.toAddress+"&output=html&src=webapp.baidu.openAPIdemo")
				}
			}
		)
		.catch(err => alert(err))
	}

	render() {
   		return(
			<Modal 
				animationType="fade"  //slide
	        	visible={this.state.modalVisible}
	        	transparent={true}
	        	onRequestClose={()=>this.setState({modalVisible:false})}
			>
		        <View style={styles.modalStyle}>
		            <View style={styles.subView}>
		                <View style={styles.itemContainer}>
		                    <View style={[styles.itemContainer,{height:55,marginTop:5}]}>
		                    <Text style={[styles.actionTitle,this.props.actionTitleStyle]}
		                    >{this.props.modalTitle}</Text>
		                    </View>
		                    <TouchableOpacity
				                style={[styles.actionItem,this.props.itemStyle]}
				                onPress={()=>this.gd()}>
				                <Text style={[styles.actionItemTitle,this.props.itemTitleStyle]}
				                >高德地图</Text>
				            </TouchableOpacity>
				            <TouchableOpacity
				                style={[styles.actionItem,this.props.itemStyle]}
				                onPress={()=>this.tx()}>
				                <Text style={[styles.actionItemTitle,this.props.itemTitleStyle]}
				                >腾讯地图</Text>
				            </TouchableOpacity>
				            <TouchableOpacity
				                style={[styles.actionItem,this.props.itemStyle]}
				                onPress={()=>this.bd()}>
				                <Text style={[styles.actionItemTitle,this.props.itemTitleStyle]}
				                >百度地图</Text>
				            </TouchableOpacity>
		                </View>
		                {/*取消按钮*/}
		                <View style={[styles.itemContainer]}>
		                    <TouchableOpacity
		                        style={[styles.actionItem,this.props.itemStyle,{borderTopWidth:0,height:50,marginBottom:-5,backgroundColor:'white'}]}
		                        onPress={()=>this.setState({modalVisible:false})}>
		                        <Text style={[styles.actionItemTitle,this.props.itemTitleStyle]}>取消</Text>
		                    </TouchableOpacity>
		                </View>
		 
		            </View>
		        </View>
    		</Modal>
   		) 
   	} 		
}

const styles = StyleSheet.create({
	modalStyle:{
		justifyContent:'flex-end',
		alignItems:'center',
		flex:1,
		backgroundColor:'rgba(0,0,0,0.2)'
	},
	subView:{
		justifyContent:'flex-end',
		alignItems:'center',
		alignSelf:'stretch',
		width:SCREEN_WIDTH,
	},
	itemContainer:{
	    marginLeft:15,
	    marginRight:15,
	    marginBottom:5,
	    // borderRadius:6,
	    backgroundColor:'#fff',
	    justifyContent:'center',
	    alignItems:'center',
	},
	actionItem:{
	    width:SCREEN_WIDTH,
	    height:50,
	    alignItems:'center',
	    justifyContent:'center',
	    borderTopColor:'#cccccc',
	    borderTopWidth:0.5,
	},
	actionTitle:{
	    fontSize:14,
	    color:'#9EA3AD',
	    textAlign:'center',
	},
	actionItemTitle:{
	    fontSize:18,
	    color:'#243047',
	    textAlign:'center',
	}
});
export default Maps;