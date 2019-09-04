import React, {Component} from 'react';
import {
    View, 
    TouchableOpacity, 
    Alert,
    StyleSheet, 
    Dimensions, 
    Modal, 
    Text, 
    Image
} from 'react-native';
import * as QQ from 'react-native-qqsdk';
import * as WeChat from 'react-native-wechat';

export default class ShareShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }

    componentDidMount(){
        this.props.callBack(this);
        WeChat.registerApp('wxe8bd8b327bc21a21');
    }

    closeModal = (call) => {
        this.setState({
            isVisible: call
        });
    }

    wxhy = () => {
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToSession({
                    type: 'news',
                    title: this.props.title,
                    description: this.props.description,
                    thumbImage: this.props.thumbImage,
                    webpageUrl: this.props.webpageUrl
                }).then((success)=>{
                    alert('success');
                    console.log(success)
                }).catch((error)=>{
                    alert('error');
                    console.log(error)
                })
            } else {
                Alert.alert('请安装微信');
            }
        });
    }

    wxpyq = () => {
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToTimeline({
                    type: 'news',
                    title: this.props.title,
                    description: this.props.description,
                    thumbImage: this.props.thumbImage,
                    webpageUrl: this.props.webpageUrl
                })
                .catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('请安装微信');
            }
        });
    }

    qqhy(){
        QQ.shareNews(
            this.props.webpageUrl,
            this.props.thumbImage,
            this.props.title,
            this.props.description,
            QQ.shareScene.QQ
        )
        .then((result)=>{console.log('result is', result)})
        .catch((error)=>{console.log('error is', error)});
    }

    qqkj(){
        QQ.shareNews(
            this.props.webpageUrl,
            this.props.thumbImage,
            this.props.title,
            this.props.description,
            QQ.shareScene.QQZone
        )
        .then((result)=>{console.log('result is', result)})
        .catch((error)=>{console.log('error is', error)});
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <Text style={styles.text}>选择分享方式</Text>
                <View style={{flexDirection: 'row',}}>
                    <TouchableOpacity style={styles.item} onPress={this.wxpyq.bind(this)}>
                        <Image resizeMode='contain' style={styles.image}
                               source={Images.pyq}/>
                        <Text>微信朋友圈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={this.wxhy.bind(this)}>
                        <Image resizeMode='contain' style={styles.image}
                               source={Images.wx}/>
                        <Text>微信好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {this.qqhy()}}>
                        <Image resizeMode='contain' style={styles.image}
                               source={Images.qq}/>
                        <Text>QQ好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {this.qqkj()}}>
                        <Image resizeMode='contain' style={styles.image}
                               source={Images.kj}/>
                        <Text>QQ空间</Text>
                    </TouchableOpacity>
                </View>
                <Text onPress={()=>{this.closeModal(false)}} style={styles.quxiao}>取消</Text>
            </View>
        )
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isVisible}
                animationType={'fade'}
                onRequestClose={() => this.closeModal(false)}>
                <TouchableOpacity 
                    style={styles.container} 
                    activeOpacity={1}
                    onPress={() => this.closeModal(false)}
                >
                    {this.renderDialog()}
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: 200,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 18,
        color:'#000',
        paddingTop:10,
        paddingBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    item: {
        width: SCREEN_WIDTH / 4,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    image: {
        width: 60,
        height: 60,
    },
    quxiao:{
        fontSize: 18,
        color:'#666',
        paddingTop:20,
        paddingBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});