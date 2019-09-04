import React, {Component} from "react";
import {
    ActivityIndicator, 
    FlatList, 
    StyleSheet, 
    Text, 
    View, 
    StatusBar,
    ScrollView,
    Image,
    TouchableHighlight
} from "react-native";
import Placeholder from 'rn-placeholder';

const http_url = 'http://xuanche.17350.com/api/app/gonggao';
export default class LoadMoreDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,  //当前页
            rows: 20, //每页数量
            isLoading: true,//网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1 ：显示加载中
            isRefreshing:false,//下拉控制
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title','汽车公告列表'),
          headerStyle: {
            backgroundColor: '#27232b',
            height:(45+Bar),
            paddingTop:Bar,
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

    fetchData(formData) {
        //这个是js的访问网络的方法
        fetch(http_url,{
            method: 'POST',
            headers:{
              'contentType': 'application/json'
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((responseData) => {
            let foot = 0;
            if(responseData.page > responseData.total){
                foot = 1; //listView底部显示没有更多数据了
            }
            let data = this.state.dataArray;
            data = data.concat(responseData.list);
            this.setState({
                page: responseData.page,
                dataArray: data,
                isLoading: false,
                showFoot:foot,
                isRefreshing:false,
            });
        })
        .catch((error) => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
        .done();
    }

    componentDidMount() {
        let formData = this.props.navigation.state.params.data;
        formData.append('page',this.state.page);
        formData.append('rows',this.state.rows);
        //请求数据
        this.fetchData(formData);
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
                      lineNumber={4}
                      lineSpacing={5}
                      onReady={this.state.isReady}
                    >
                    </Placeholder.ImageContent>
                    <Text style={{marginTop:3}}></Text>
                    <Placeholder.Paragraph
                      lineNumber={3}
                      textSize={16}
                      lineSpacing={5}
                      width="100%"
                    />
                </View>,
            );
        }
        return (
            <ScrollView style={{backgroundColor:'#FFFFFF', padding:20}}>
                {PlaceholderContent}
            </ScrollView>
        );
    }

    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    加载失败
                </Text>
            </View>
        );
    }

    //返回itemView
    _renderItemView = ({item,index}) => {
        let url = 'http://upload.17350.com/gonggao/clcp/'+item.批次+'/'+item.照片+'.jpg@250w';
        return (
            <TouchableHighlight onPress={() => this._pressRow(item.id,item.车辆名称,item.车辆型号) } underlayColor='#eaeaea'>
            <View style={styles.listContent}>
                <View style={styles.listTop}>
                    <View style={styles.listImages}>
                        <Image source={{uri: url}} style={{width:92,height:96}}/>
                    </View>
                    <View style={{flex:6}}>
                        <View>
                            <Text numberOfLines={1} style={styles.listText}>[{index+1}]{item.车辆型号} {item.车辆名称}</Text>
                        </View>
                        <View style={styles.listTopView}>
                            <View style={styles.listTopTitle}>
                               <Text style={styles.listText}>品牌</Text>
                            </View>
                            <View style={{flex:3}}>
                                <Text numberOfLines={1} style={styles.listText}>{item.中文品牌}</Text>
                            </View> 
                        </View>
                        <View style={styles.listTopView}>
                            <View style={styles.listTopTitle}>
                               <Text style={styles.listText}>排放标准</Text>
                            </View>
                            <View style={{flex:3}}>
                                <Text numberOfLines={1} style={styles.listText}>{item.排放水平=='' ? (item.底盘排放!=null ? item.底盘排放 : '' ) : item.排放水平}</Text>
                            </View> 
                        </View>
                        <View style={styles.listTopView}>
                            <View style={styles.listTopTitle}>
                               <Text style={styles.listText}>底盘型号</Text>
                            </View>
                            <View style={{flex:3}}>
                                <Text numberOfLines={1} style={styles.listText}>{item.底盘型号}</Text>
                            </View> 
                        </View>
                    </View>
                </View>
                <View style={styles.listBottom}>
                    <View style={styles.listBottomView}>
                        <View style={styles.listBottomTiTle}>
                            <View style={styles.listBottomRed}>
                                <Text style={styles.listText}>轴距</Text>
                            </View>
                            <View style={{flex:1,}}> 
                                <Text numberOfLines={1} style={styles.listText}>{item.轴距}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', flex:6}}>
                            <View style={styles.listTopTitle}>
                                <View style={{backgroundColor:'#f2f2f2', flex:1}}>
                                    <Text style={styles.listText}>轴数</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', flex:3}}>
                                <View style={{flex:1, borderRightWidth:1, borderColor:'#c4c4c4',}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.轴数}</Text>
                                </View>
                                <View style={styles.listBottomRed}>
                                    <Text style={styles.listText}>批次</Text>
                                </View>
                                <View style={{flex:1}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.批次}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listBottomView}>
                        <View style={styles.listBottomTiTle}>
                            <View style={styles.listBottomRed}>
                                <Text style={styles.listText}>长度</Text>
                            </View>
                            <View style={{flex:1,}}> 
                                <Text numberOfLines={1} style={styles.listText}>{item.长}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', flex:6}}>
                            <View style={styles.listTopTitle}>
                                <View style={{backgroundColor:'#f2f2f2', flex:1}}>
                                    <Text style={styles.listText}>宽度</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', flex:3}}>
                                <View style={{flex:1, borderRightWidth:1, borderColor:'#c4c4c4',}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.宽}</Text>
                                </View>
                                <View style={styles.listBottomRed}>
                                    <Text style={styles.listText}>高度</Text>
                                </View>
                                <View style={{flex:1}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.高}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listBottomView}>
                        <View style={styles.listBottomTiTle}>
                            <View style={styles.listBottomRed}>
                                <Text style={styles.listText}>免征</Text>
                            </View>
                            <View style={{flex:1,}}> 
                                <Text numberOfLines={1} style={styles.listText}>{item.免征}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', flex:6}}>
                            <View style={styles.listTopTitle}>
                                <View style={{backgroundColor:'#f2f2f2', flex:1}}>
                                    <Text style={styles.listText}>燃油</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', flex:3}}>
                                <View style={{flex:1, borderRightWidth:1, borderColor:'#c4c4c4',}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.燃油}</Text>
                                </View>
                                <View style={styles.listBottomRed}>
                                    <Text style={styles.listText}>环保</Text>
                                </View>
                                <View style={{flex:1}}> 
                                    <Text numberOfLines={1} style={styles.listText}>{item.环保}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableHighlight>
        );
    }

    renderData() {
        return (
            <View>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>
            <FlatList
                keyExtractor={ (item,index)=> index.toString() }
                data={this.state.dataArray}
                renderItem={this._renderItemView}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.1}
                refreshing={this.state.isRefreshing}
                getItemLayout={(data, index) => (
                  // 120 是被渲染 item 的高度 ITEM_HEIGHT。
                  {length: 242, offset: 242 * index, index}
                )}
            />
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

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        }else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }else{
            //底部显示正在加载更多数据
            this.setState({
                showFoot:2,
                isRefreshing:true,
            });
            //获取数据
            let formData = this.props.navigation.state.params.data;
            formData.append('page',this.state.page);
            formData.append('rows',this.state.rows);
            this.fetchData(formData); 
        }
    }

    _pressRow(id,title,code){
        this.props.navigation.navigate('ggshow',{id:id,title:title,code:code});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        backgroundColor:'#fff'
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    listContent: {
        backgroundColor:'#fff',
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10
    },
    listTop:{
        flexDirection:'row', 
        borderWidth:1, 
        borderColor:'#c4c4c4',
    },
    listImages:{
        flex:3, 
        borderRightWidth:1, 
        borderColor:'#c4c4c4', 
        alignItems: 'center', 
        justifyContent:'center'
    },
    listText: {
        fontSize:14, 
        color: '#000', 
        lineHeight:32,
        textAlign:'center',
    },
    listTopView:{
        flexDirection:'row', 
        borderTopWidth:1, 
        borderColor:'#c4c4c4',
    },
    listTopTitle:{
        backgroundColor:'#f2f2f2', 
        borderRightWidth:1, 
        borderColor:'#c4c4c4',
        flex:1,
        height: 32,
    },
    listBottom:{
        borderWidth:1, 
        borderColor:'#c4c4c4', 
        borderTopWidth:0,
        borderBottomWidth:0,
    },
    listBottomView:{
        flexDirection:'row', 
        borderBottomWidth:1, 
        borderColor:'#c4c4c4',
    },
    listBottomTiTle:{
        flexDirection:'row', 
        flex:3, 
        borderRightWidth:1, 
        borderColor:'#c4c4c4',
    },
    listBottomRed:{
        backgroundColor:'#f2f2f2', 
        borderRightWidth:1, 
        borderColor:'#c4c4c4', 
        flex:1
    }
});