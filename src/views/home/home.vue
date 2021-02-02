<template>
  <div id="home">
    <div id="container"></div>
    <Tabbar v-model="active" fixed :placeholder="true" :route="true">
      <TabbarItem icon="wap-home-o" to="/home">主页</TabbarItem>
      <TabbarItem icon="shopping-cart-o" to="/shopCart">购物车</TabbarItem>
      <TabbarItem icon="user-circle-o" to="/mine">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Tabbar, TabbarItem,
  },
  methods: {
    // 解析定位结果
    onComplete(data) {
      // document.getElementById('status').innerHTML = '定位成功';
      console.log(data.position);
      const str = [];
      str.push(`定位结果：${data.position}`);
      console.log(str);

      str.push(`定位类别：${data.location_type}`);
      if (data.accuracy) {
        str.push(`'精度：${data.accuracy米}`);
      }// 如为IP精确定位结果则没有精度信息
      str.push(`是否经过偏移：${(data.isConverted ? '是' : '否')}`);
      // const { lng, lat } = data.position;
      AMap.plugin('AMap.Geocoder', () => {
        const geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: '广州',
          citylimit: true,
        });
        // const lnglat = [lng, lat];

        // geocoder.getAddress(lnglat, (status, result) => {
        //   console.log(status, result);
        //   if (status === 'complete' && result.info === 'OK') {
        //     // result为对应的地理位置详细信息
        //   }
        // });
        geocoder.getLocation('广东省广州市海珠区广州百事可乐饮料有限公司（敦和路）', (status, result) => {
          console.log(status, result);
          if (status === 'complete' && result.info === 'OK') {
            // result中对应详细地理坐标信息
          }
        });
      });
    },
    // 解析定位错误信息
    onError(data) {
      console.log('定位失败', data);
    },
  },
  mounted() {
    const map = new AMap.Map('container', {
      resizeEnable: true,
    });
    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', // 定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点

      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition((status, result) => {
        console.log(status, result);
        if (status === 'complete') {
          this.onComplete(result);
        } else {
          this.onError(result);
        }
      });
    });
    console.log(map);
  },
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 500px;
}
#home {
  /deep/ .van-tabbar--fixed {
    bottom: -3px;
  }
}
</style>
