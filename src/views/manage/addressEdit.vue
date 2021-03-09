<template>
  <div class="setAddress">
    <m-nav-bar title="设置配送地址" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <div class="address">
      <van-field
        v-model="address"
        rows="2"
        autosize
        label="地址"
        label-width='3.5rem'
        type="textarea"
        maxlength="50"
        placeholder="请输入地址"
        show-word-limit>
        <template #button>
          <van-button class="position-btn" :loading="btnLoading" size="small" type="info" @click="location">点击定位</van-button>
        </template>
      </van-field>
    </div>
    <div class="confirm">
      <van-button size="large" type="info" round :loading="cbtnLoading" @click="confirm">确认</van-button>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import { Field, Button } from 'vant';
import { setShippingAddress } from 'api/manage';

export default {
  name: 'addressEdit',
  data() {
    return {
      address: '',
      lng: 0,
      lat: 0,
      btnLoading: false,
      cbtnLoading: false,
    };
  },
  components: {
    mNavBar,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    async checkAddress() {
      this.$toast.loading('正在检查地址，请稍后...');
      // 手动输入的地址
      // if (!this.lng || !this.lat) {
      // 地址编码
      return new Promise((resolve, reject) => {
        AMap.plugin('AMap.Geocoder', () => {
          const geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '全国',
          });
          geocoder.getLocation(this.address, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              resolve(result);
            } else {
              reject(result);
            }
          });
        });
      }).then((res) => {
        this.lng = res.geocodes[0].location.lng;
        this.lat = res.geocodes[0].location.lat;
        return true;
      }).catch(() => false).finally();
      // }
      // return 0;
    },
    location() {
      this.btnLoading = true;
      this.$toast.loading({
        overlay: true,
        duration: 0,
        message: '加载中...',
        forbidClick: true,
      });
      return new Promise((resolve, reject) => {
        AMap.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 20000, // 超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', // 定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
          });
          geolocation.getCurrentPosition((status, result) => {
            console.log(status, result);
            if (status === 'complete') {
              resolve(result);
            } else {
              reject(result);
            }
          });
        });
      }).then((res) => {
        this.address = res.formattedAddress;
        this.lng = res.position.lng;
        this.lat = res.position.lat;
      }).catch(() => {
        this.$toast.fail('定位失败，请检查您的网络后重试', result);
      }).finally(() => {
        this.btnLoading = false;
        setTimeout(() => {
          this.$toast.clear();
        }, 2000);
      });
    },
    async confirm() {
      const checked = await this.checkAddress();
      if (checked) { // 校验通过
        const data = {
          lat: this.lat,
          lng: this.lng,
          address: this.address,
        };
        this.$toast.loading({
          message: '正在保存地址...',
          duration: 0,
        });
        setShippingAddress(data).then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
          }
        }).finally(() => {
          setTimeout(() => {
            this.$toast.clear();
          }, 2000);
        });
      } else {
        this.$toast.fail('找不到您输入的地址哦，定位试试吧');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.setAddress {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #e1e3fa 0%, #faf9f9 100%);
  > .address {
    /deep/ .van-cell {
      background: transparent;
    }
    margin-top: 40px;
    padding: 0 20px;
    .position-btn {
      min-width: 66px;
    }
  }
  > .confirm {
    margin-top: 40px;
    padding: 0 20px;
  }
}
</style>
