<template>
  <div id="address-edit">
    <mNavBar
      title="编辑收货地址"
      :placeholder="true"
      :fixed="true"
      @clickLeft="back">
      <template #leftIcon>
        <Icon name="arrow-left" size="22" />
      </template>
    </mNavBar>
    <CellGroup
      class="basicInfo">
      <Field
        v-model="addressMsg.contacts"
        label="姓名"
        label-width='3.5rem'
        placeholder="收货人姓名" />
      <Field
        v-model="addressMsg.contactPhone"
        label="电话"
        label-width='3.5rem'
        placeholder="联系电话" />
      <Field
        v-model="addressMsg.postalCode"
        label="邮政编码"
        label-width='3.5rem'
        placeholder="邮政编码" />
    </CellGroup>
    <CellGroup
      class="address">
      <Field
        v-model="addressMsg.address"
        rows="2"
        autosize
        label="地址"
        label-width='3.5rem'
        type="textarea"
        maxlength="50"
        placeholder="请输入地址"
        show-word-limit>
        <template #button>
          <Button class="position-btn" :loading="btnLoading" size="small" type="info" @click="location">点击定位</Button>
        </template>
      </Field>
    </CellGroup>
    <CellGroup class="detail-address">
      <Field
        v-model="addressMsg.detailAddress"
        rows="2"
        autosize
        label="详细地址"
        label-width='3.5rem'
        type="textarea"
        maxlength="50"
        placeholder="请输入您的具体地址"
        show-word-limit>
      </Field>
    </CellGroup>
    <CellGroup class="setDefault">
      <Cell center title="设为默认地址">
        <template #right-icon>
          <mSwitch v-model="addressMsg.isdefault" size="24" />
        </template>
      </Cell>
    </CellGroup>
    <div class="operate">
      <Button class="save" round type="info" @click="saveAddress">保存</Button>
      <Button class="delete" round @click="deleteAddress">删除</Button>
    </div>
  </div>
</template>

<script>
import {
  Icon, Field, CellGroup, Cell, Button, Switch,
} from 'vant';
import mNavBar from 'components/mNavBar.vue';

export default {
  name: 'addAddress',
  data() {
    return {
      addressMsg: {
        contacts: '',
        contactPhone: '',
        postalCode: '',
        address: '',
        detailAddress: '',
        lng: '',
        lat: '',
        isdefault: false,
      },
      btnLoading: false,
    };
  },
  components: {
    mNavBar, Icon, Field, CellGroup, Cell, Button, mSwitch: Switch,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 检查地址的合法性
    checkAddress() {
      // 手动输入的地址
      if (!this.addressMsg.lng || !this.addressMsg.lat) {
        // 地址编码
        return new Promise((resolve, reject) => {
          AMap.plugin('AMap.Geocoder', () => {
            const geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: '全国',
            });
            geocoder.getLocation(this.addressMsg.address, (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                resolve(result);
              } else {
                reject(result);
              }
            });
          });
        }).then((res) => {
          this.addressMsg.lng = res.geocodes[0].location.lng;
          this.addressMsg.lat = res.geocodes[0].location.lat;
        }).catch(() => {
          this.$toast.fail('您输入的地址不正确，定位试试吧');
        }).finally();
      }
      return 0;
    },
    // 定位
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
            timeout: 10000, // 超过10秒后停止定位，默认：5s
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
        this.addressMsg.address = res.formattedAddress;
        this.addressMsg.lng = res.position.lng;
        this.addressMsg.lat = res.position.lat;
      }).catch(() => {
        this.$toast.fail('定位失败，请检查您的网络，稍后重试');
      }).finally(() => {
        this.btnLoading = false;
        this.$toast.clear();
      });
    },
    // 保存地址
    saveAddress() {
      // if (!this.addressMsg.contacts || !this.addressMsg.contactPhone || !this.addressMsg.postalCode || !this.addressMsg.address || !this.addressMsg.detailAddress) {
      //   this.$toast.fail('请填写完整您的信息');
      //   return;
      // }
      // 检查地址是否符合要求
      this.checkAddress();
    },
    // 删除地址
    deleteAddress() {
      console.log(11);
    },
  },
};
</script>
<style lang="less" scoped>
#address-edit {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: @gray-bgc;
  > .basicInfo {
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
  }
  > .address, > .setDefault, > .detail-address {
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
  }
  > .address {
    .position-btn {
      width: 66px;
    }
  }
  > .operate {
    margin-top: 30px;
    > .save, > .delete {
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
</style>
