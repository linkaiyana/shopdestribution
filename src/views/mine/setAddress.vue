<template>
  <div id="address-edit">
    <mNavBar
      :title="isEdit ? '编辑收货地址' : '添加收获地址'"
      :placeholder="true"
      :fixed="true"
      :isShowLeft="true"
      @clickLeft="back">
    </mNavBar>
    <van-cell-group
      class="basicInfo">
      <van-field
        v-model="addressMsg.receiveName"
        label="姓名"
        label-width='3.5rem'
        placeholder="收货人姓名" />
      <van-field
        v-model="addressMsg.chatPhone"
        label="电话"
        label-width='3.5rem'
        placeholder="联系电话" />
      <van-field
        v-model="addressMsg.postalcode"
        label="邮政编码"
        label-width='3.5rem'
        placeholder="邮政编码" />
    </van-cell-group>
    <van-cell-group
      class="address">
      <van-field
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
          <van-button class="position-btn" :loading="btnLoading" size="small" type="info" @click="location">点击定位</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group class="detail-address">
      <van-field
        v-model="addressMsg.detailAddress"
        rows="2"
        autosize
        label="详细地址"
        label-width='3.5rem'
        type="textarea"
        maxlength="50"
        placeholder="请输入您的具体地址"
        show-word-limit>
      </van-field>
    </van-cell-group>
    <van-cell-group class="setDefault">
      <van-cell center title="设为默认地址">
        <template #right-icon>
          <van-switch v-model="addressMsg.isdefault" size="24" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="operate">
      <van-button class="save" round type="info" @click="saveAddress">保存</van-button>
      <van-button class="delete" round @click="deleteAddress">删除</van-button>
    </div>
  </div>
</template>

<script>
import {
  Icon, Field, CellGroup, Cell, Button, Switch,
} from 'vant';
import mNavBar from 'components/mNavBar.vue';
import {
  addNewAddress, getAddressById, delAddressById, updateAddressById,
} from 'api/mine';

export default {
  name: 'setAddress',
  data() {
    return {
      addressMsg: {
        receiveName: '',
        chatPhone: '',
        postalcode: '',
        address: '',
        detailAddress: '',
        lng: '',
        lat: '',
        isdefault: false,
      },
      btnLoading: false,
      isEdit: this.$route.query.id ? this.$route.query.id : '',
    };
  },
  components: {
    mNavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Switch.name]: Switch,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 检查地址的合法性
    async checkAddress() {
      // 手动输入的地址
      // if (!this.addressMsg.lng || !this.addressMsg.lat) {
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
        return true;
      }).catch(() => false).finally();
      // }
      // return 0;
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
      }).catch((result) => {
        this.$toast.fail(result);
      }).finally(() => {
        this.btnLoading = false;
        setTimeout(() => {
          this.$toast.clear();
        }, 2000);
      });
    },
    // 保存地址
    async saveAddress() {
      if (!this.addressMsg.receiveName || !this.addressMsg.chatPhone || !this.addressMsg.postalcode || !this.addressMsg.address || !this.addressMsg.detailAddress) {
        this.$toast.fail('请填写完整您的信息');
        return;
      }
      // 检查地址是否符合要求
      const checked = await this.checkAddress();
      if (checked) {
        this.$toast.loading({
          message: '地址校验通过,正在保存中...',
          duration: 0,
        });
        const data = {
          uid: JSON.parse(localStorage.getItem('userInfo')).id,
          receiveName: this.addressMsg.receiveName,
          chatPhone: this.addressMsg.chatPhone,
          postalcode: this.addressMsg.postalcode,
          address: this.addressMsg.address,
          detailAddress: this.addressMsg.detailAddress,
          lng: this.addressMsg.lng,
          lat: this.addressMsg.lat,
          isdefault: Number(this.addressMsg.isdefault),
        };
        if (!this.isEdit) { // 新增
          await addNewAddress(data).then((res) => {
            if (res.status === 200) {
              this.$toast.success(res.msg);
            }
          });
        } else { // 编辑
          data.id = this.isEdit;
          await updateAddressById(data).then((res) => {
            if (res.status === 200) {
              this.$toast.success(res.msg);
            }
          });
        }
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } else {
        this.$toast.fail('找不到您输入的地址哦，定位试试吧');
      }
    },
    // 删除地址
    deleteAddress() {
      if (!this.isEdit) {
        return;
      }
      delAddressById({ id: this.isEdit }).then((res) => {
        if (res.status === 200) {
          this.$toast.success('删除成功');
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    },
  },
  created() {
    if (this.isEdit) {
      getAddressById({ id: this.isEdit }).then((res) => {
        this.addressMsg.address = res.data[0].address;
        this.addressMsg.chatPhone = res.data[0].chatPhone;
        this.addressMsg.detailAddress = res.data[0].detailAddress;
        this.addressMsg.isdefault = res.data[0].isDefault !== 0;
        this.addressMsg.lat = res.data[0].lng;
        this.addressMsg.postalcode = res.data[0].postalcode;
        this.addressMsg.receiveName = res.data[0].receiveName;
      });
    }
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
