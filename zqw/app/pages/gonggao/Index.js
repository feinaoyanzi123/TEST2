import React, {Component} from "react";
import {
    ActivityIndicator, 
    FlatList, 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    AsyncStorage, 
    TouchableHighlight,
} from "react-native";
import { StackActions } from 'react-navigation';
import *as commonAction from '../../actions/commonAction';
import { connect } from 'react-redux'; // 引入connect函数

class IndexList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title','查询历史记录'),
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

    componentDidMount() {
     AsyncStorage.getItem('cacheList',(error,val)=>{
      if(val === null ){
        alert('已加载完成,没有更多数据');
      }else{
        this.setState({
          dataArray: JSON.parse(val)
        })
      }
     })
    }

    //返回itemView
    _renderItemView(item) {
        return (
            <TouchableHighlight onPress={ ()=> this.itemReduce(item.tag) } underlayColor='rgba(255, 255, 255, 0)'>
                <View style={styles.container}>
                    <Text style={styles.title}>{item.tag+1}:</Text>
                    <Text style={styles.title}>{item.content}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _data(ggcxList) {
        var data = [];
        var keyArr = {
            clmc : '车辆类型',
            zwpp : '产品商标',
            clxh : '整车型号',
            qymc : '企业名称',
            dpxh : '底盘型号',
            dpcj : '底盘厂家',
            zs : '轴数',
            pf : '排放标准',
            scdz : '生产地址',
            qt : '万能字段',
            fdj : '发动机',
            lts : '轮胎数',
            ltgg : '轮胎规格',
            ry : '燃油种类',
            edzk : '额定载客',
            zj0 : '轴距',
            zj1 : '轴距',
            rj0 : '容积',
            rj1 : '容积',
            fdjgl0 : '发动机功率',
            fdjgl1 : '发动机功率',
            pc0 : '批次',
            pc1 : '批次',
            zzl0 : '总质量',
            zzl1 : '总质量',
            edzl0 : '额定质量',
            edzl1 : '额定质量',
            zbzl0 : '整备质量',
            zbzl1 : '整备质量',
            c0 : '整车长度',
            c1 : '整车长度',
            k0 : '整车宽度',
            k1 : '整车宽度',
            g0 : '整车高度',
            g1 : '整车高度',
            hc0 : '货厢长度',
            hc1 : '货厢长度',
            hk0 : '货厢宽度',
            hk1 : '货厢宽度',
            hg0 : '货厢高度',
            hg1 : '货厢高度'
        };
        for (var i = 0; i <= ggcxList.length-1; i++) {
            var jsonData = [],jsonKey = {};
            for(var item in ggcxList[i]){
                if(keyArr[item] in jsonKey){
                    jsonKey[keyArr[item]] = jsonKey[keyArr[item]] > ggcxList[i][item] ? ggcxList[i][item]+" ~ "+jsonKey[keyArr[item]] : jsonKey[keyArr[item]]+" ~ "+ggcxList[i][item];
                }else{
                    jsonKey[keyArr[item]] = ggcxList[i][item];
                }
            }
            for (var item in jsonKey) {
                jsonData.push( item + '：' + jsonKey[item]);
            }
            data.push({content:jsonData.join('\r\n'),tag:i});
        }
        return data;
    }

    itemReduce = (index) => {
        this.props.dispatch(commonAction.setIndex(index));
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <StatusBar translucent={true} backgroundColor={'transparent'}/>
                <FlatList
                    keyExtractor={ (item,index)=> index.toString() }
                    data={this._data(this.state.dataArray)}
                    renderItem={({item}) => this._renderItemView(item)}
                    onEndReachedThreshold={1}
                    refreshing={false}
                    // ListFooterComponent={this._renderFooter.bind(this)}
                    // onEndReached={this._onEndReached.bind(this)}
                    
                    // ItemSeparatorComponent={this._separator}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
    },
    title: {
        paddingRight:10,
        fontSize: 15,
        color: '#000',
    },
});

export default connect(
  (state) => ({
    batch: state.common.batch,
    index: state.common.index
  })
)(IndexList)