import React, {
  Component
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import Swiper from 'react-native-swiper'

export default class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: [{
        "title": "公告",
        "imgurl": Images.nav2,
        "urlmodel": "gonggao",
        "urlparam": null
      }],
      error: '暂无数据'
    }
  }

  componentDidMount() {
    fetch("http://xuanche.17350.com/api/app/banner", {
        method: 'GET',
        headers: {
          'contentType': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          imgList: responseData.data
        });
        this.props.dispatch(this.props.commonAction.setBatch(responseData.batch));
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      })
      .done();
  }

  bannerUrl = (url, param) => {
    if (param) {
      this.props.navigate(url, {
        url: param
      });
    } else {
      this.props.navigate(url);
    }
  }

  renderSwiper() {
    let itemArr = [];
    for (var i = 0; i < this.state.imgList.length; i++) {
      let data = this.state.imgList[i];
      itemArr.push(
        <TouchableHighlight key={i} style={styles.slide} onPress={() => this.bannerUrl(data.urlmodel,data.urlparam)}>
          <View style={styles.slide}>
            <Image style={styles.image} source={data.imgurl} />
          </View>
        </TouchableHighlight>
      )
    }
    return itemArr;
  }

  render() {
    return (
      <View style={{
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH*0.65,
      }}>
      {
        this.state.imgList.length < 2 ? 
        <View  style={styles.wrapper}>
          {this.renderSwiper()}
        </View>
        :
        <Swiper style={styles.wrapper} showsPagination={false}>
          {this.renderSwiper()}
        </Swiper>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.65,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  }
})