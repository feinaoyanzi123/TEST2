import React from 'react';
import {
  Text,
  View,
  Button,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

class RYContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: {},
      images: [],
      index: 0,
      modalVisible: false,
      mzyh: [],
      mzdw: [],
      mzcs: []
    }
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      title: navigation.getParam('title', '燃油公告'),
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

  fetchData(url) {
    fetch(url, {
        method: 'GET',
        headers: {
          'contentType': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((json) => {
        let imgs = json.data.img.split('|');
        let mzcs = json.data.mzcs.split("   ");
        let mzdw = json.data.mzdw.split("   ");
        let mzyh = json.data.mzyh.split("   ");
        let mzcs_data = [];
        let mzdw_data = [];
        let mzyh_data = [];
        for (var i = 0; i < mzcs.length; i++) {
          mzcs_data.push(mzcs[i]);
          mzdw_data.push(mzdw[i]);
          mzyh_data.push(mzyh[i]);
        }
        let images = [];
        let first = imgs[0];
        for (var i = 0; i < imgs.length; i++) {
          images.push({
            url: imgs[i],
            props: {}
          })
        };
        this.setState({
          row: json.data,
          images: images,
          first: first,
          mzyh: mzyh_data,
          mzdw: mzdw_data,
          mzcs: mzcs_data
        });
      })
      .catch((error) => {
        alert(error)
      })
  }

  componentWillMount() {
    let id = this.props.navigation.state.params.id;
    let url = 'http://xuanche.17350.com/api/app/rycontent?id=' + id;
    this.fetchData(url);
  }

  renderLoad() { //这里是写的一个loading
    return (
      <View style={{ marginTop: (SCREEN_HEIGHT / 2) - 20 }}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    )
  }

  _Close() {
    this.setState({
      modalVisible: false
    });
  }

  savePhoto(url) {
    let promise = CameraRoll.saveToCameraRoll(url);
    promise.then(function(result) {
      alert("已保存到系统相册")
    }).catch(function(error) {
      alert('保存失败！\n' + error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <ScrollView style={{paddingTop:15}}>
          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <ImageViewer 
              imageUrls={this.state.images} 
              index={this.state.index} 
              saveToLocalByLongPress={true}
              loadingRender={this.renderLoad}
              menuContext={{ "saveToLocal": "保存图片", "cancel": "取消"}}
              onClick={() => { // 图片单击事件
                this._Close()
              }}
              onSave={(url) => { this.savePhoto(url) }}
            />
          </Modal>
          <TouchableHighlight 
            onPress={() => this.setState({ modalVisible: true })}
            style={styles.images}
            underlayColor='rgba(255, 255, 255, 0)'
          >
            <Image
              style={styles.logo}
              source={{uri: this.state.first}}
            />
          </TouchableHighlight>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>产品名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.cpmc}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>产品型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.clxh}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>企业名称</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.qymc}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>整车参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>外形尺寸</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.wxcc}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>货厢/罐体</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.gtrj}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>总质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.zzl}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>额定质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.edzl}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>整备质量(kg)</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.zbzl}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>驱动形式</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.qdxs}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>整车参数</Text>
          </View>
          <View style={[styles.textView, {borderTopWidth:1}]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>生产企业</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.scqy}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>底盘型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.dpxh}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>发动机企业</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.fdjqy}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>发动机型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.fdjxh}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>变速器型号</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.bsqxh}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>减速器速比</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.jsqsb}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={styles.borderRight}>
              <Text numberOfLines={1} style={styles.titleText}>燃料消耗量</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.rlxhl}</Text>
            </View>
          </View>
          <View style={[styles.textView]}>
            <View style={[styles.borderRight,{flex:3}]}>
              <Text numberOfLines={1} style={styles.titleText}>空载等速燃料消耗量</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.kzrl}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column'}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>轮胎规格</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.ltgg}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hrtitle}>燃料消耗量参数表</Text>
          </View>
          <View style={[styles.textView,{flexDirection:'column',borderTopWidth:1}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>执行标准</Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.newsText}>{this.state.row.zxbz}</Text>
            </View>
          </View>
          <View style={[styles.textView,{flexDirection:'column',marginBottom:40}]}>
            <View style={styles.borderBottom}>
              <Text numberOfLines={1} style={styles.titleText}>满载等速燃料消耗量</Text>
            </View>
            <View style={[styles.content,{borderBottomWidth:1,borderColor:'#c4c4c4'}]}>
              <Text numberOfLines={1} style={[styles.titleText,{flex:2}]}>车速</Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[0]}
              </Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[1]}
              </Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[2]}
              </Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[3]}
              </Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[4]}
              </Text>
              <Text 
                numberOfLines={1} 
                style={[styles.newsText,styles.splitText]}
              >
                {this.state.mzcs[5]}
              </Text>
            </View>
            <View style={[styles.content,{borderBottomWidth:1,borderColor:'#c4c4c4'}]}>
              <Text numberOfLines={1} style={[styles.titleText,{flex:2}]}>档位</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[0]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[1]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[2]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[3]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[4]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzdw[5]}</Text>
            </View>
            <View style={[styles.content,{borderBottomWidth:1,borderColor:'#c4c4c4'}]}>
              <Text numberOfLines={1} style={[styles.titleText,{flex:2}]}>油耗</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[0]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[1]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[2]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[3]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[4]}</Text>
              <Text numberOfLines={1} style={[styles.newsText,styles.splitText]}>{this.state.mzyh[5]}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  images: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.375,
    marginTop: 5,
  },
  textView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderTopWidth: 0,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 40,
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    paddingLeft: 2,
  },
  borderRight: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#c4c4c4',
  },
  content: {
    flex: 3,
    flexDirection: 'row'
  },
  newsText: {
    fontSize: 14,
    color: '#133B81',
    lineHeight: 32,
    textAlign: 'left',
    paddingLeft: 2,
  },
  borderBottom: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
  },
  hrtitle: {
    fontSize: 16,
    lineHeight: 36,
    color: '#8F8F94',
    paddingLeft: 5,
  },
  splitText: {
    borderLeftWidth: 1,
    borderColor: '#c4c4c4',
    flex: 1,
    textAlign: 'center'
  }
});

export default RYContent