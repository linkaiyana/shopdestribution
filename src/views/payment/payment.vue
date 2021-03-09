<template>
  <div id="payment">
    <m-nav-bar title="支付确认" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <div class="address">
      <div class="leftIcon">
        <img src="~assets/imgs/location.png" alt="">
      </div>
      <div class="address-msg">
        <div class="info">
          <span class="name">{{address.receiveName}}</span>
          <span class="phone">{{address.chatPhone}}</span>
        </div>
        <div class="title">{{address.address}}</div>
      </div>
      <div class="rightIcon">
        <img src="~assets/imgs/right.png" alt="">
      </div>
    </div>
    <div class="msg">
      <div class="goods" v-for="item in goods" :key="item.id">
        <div class="intro">
          <div class="left">
            <img :src="$serveUrl+item.thumbnail" alt="">
          </div>
          <div class="mid">
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span class="name">{{item.goodsName}}</span>
              <span>￥{{item.goodsPrice}}</span>
            </div>
          </div>
          <div class="right">
            <div class="num">X {{item.number}}</div>
          </div>
        </div>
        <div class="field">
          <div class="label">购买数量</div>
          <div class="r">
            <van-stepper v-model="item.number" integer />
          </div>
        </div>
      </div>
    </div>
    <div class="seize"></div>
    <div class="bottom-tab">
      <div class="txt">
        <span class="t1">共{{goodsNum}}件，</span>
        <span class="t2">合计:</span>
        <span class="t3">￥{{sumPrice}}</span>
      </div>
      <div class="btn" @click="showComfirm=true">提交订单</div>
    </div>
    <!-- 弹框 -->
    <van-dialog v-model="showComfirm" title="确认支付" show-cancel-button confirmButtonText="立即支付" cancelButtonText="我再想想" confirmButtonColor="red" @confirm="confirm">
      <div class="content">
        确认购买以下商品吗？
        <div class="goods" v-for="item in goods" :key="item.id">
          {{item.goodsName}} X {{item.number}}
        </div>
        <div class="price">
          总计：￥{{sumPrice}}
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Stepper, Dialog } from 'vant';
import mNavBar from 'components/mNavBar.vue';
import { getDefaultAddress, getGoodsByIds, addToOrder } from 'api/payment';

export default {
  name: 'payment',
  data() {
    return {
      address: '',
      goods: [],
      goodsIds: [],
      showComfirm: false,
    };
  },
  components: {
    mNavBar,
    [Stepper.name]: Stepper,
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    sumPrice() {
      return this.goods.reduce((total, item) => total + item.discountPrice * item.number, 0).toFixed(2);
    },
    goodsNum() {
      return this.goods.reduce((total, item) => total + item.number, 0);
    },
    // timeFormatter(value) {
    //   const da = new Date(parseInt(value.replace('/Date(', '').replace(')/', '').split('+')[0], 0));
    //   return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();

    // },
  },
  methods: {
    confirm() {
      this.$toast.loading('正在支付');
      this.showComfirm = true;
      setTimeout(() => {
        this.$toast.success('支付成功');
        // 加入订单
        const details = [];
        this.goods.forEach((item) => {
          details.push({
            id: item.id,
            number: item.number,
          });
        });
        const data = {
          orderMoney: this.sumPrice,
          aid: this.address.id,
          uid: JSON.parse(localStorage.getItem('userInfo')).id,
          details,
          createdTime: Date.now(),
        };
        addToOrder(data).then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      }, 2000);
    },
  },
  created() {
    console.log(JSON.parse(this.$route.query.ids));
    JSON.parse(this.$route.query.ids).forEach((item) => {
      this.goodsIds.push(item.id);
    });
    // 获取默认地址
    getDefaultAddress({
      userPhone: JSON.parse(localStorage.getItem('userInfo')).id,
    }).then((res) => {
      this.address = res.data[0];
    });
    // 获取商品信息
    getGoodsByIds({
      ids: this.goodsIds,
    }).then((res) => {
      this.goods = res.data;
      this.goods.forEach((item) => {
        JSON.parse(this.$route.query.ids).forEach((subItem) => {
          if (item.id === subItem.id) {
            item.number = subItem.number;
          }
        });
      });
    });
  },
};
</script>
<style lang="less" scoped>
#payment {
  width: 100%;
  min-height: 100%;
  padding: 0 20px;
  background: @gray-bgc;
  > .address {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    background: #fff;
    border-radius: 20px;
    height: 100px;
    > .leftIcon {
      position: relative;
      width: 40px;
      height: 40px;
      padding: 5px;
      margin-right: 10px;
      border-radius: 50%;
      background: #faae20;
      > img {
        width: 25px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    > .address-msg {
      width: 210px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > .info {
        font-size: 13px;
        color: #999;
        > .name {
          margin-right: 10px;
        }
      }
      > .title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    > .rightIcon {
      img {
        width: 25px;
      }
    }
  }
  > .msg {
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    > .goods {
      > .intro {
        display: flex;
        > .left {
          width: 100px;
          margin-right: 10px;
          img {
            width: 100%;
          }
        }
        > .mid {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 140px;
          > .title {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          > .info {
            font-size: 13px;
            color: #999;
            > .name {
              margin-right: 10px;
            }
          }
        }
        > .right {
          font-size: 14px;
          margin-top: 20px;
        }
      }
      > .field {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        padding-left: 40px;
        font-size: 14px;
      }
    }
  }
  > .seize {
    height: 80px;
  }
  > .bottom-tab {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: #fff;
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    >.txt {
      > .t1 {
        font-size: 13px;
        color: #999;
      }
      > .t2 {
        font-size: 14px;
      }
      > .t3 {
        font-size: 14px;
        color: red;
      }
      margin-right: 20px;
    }
    > .btn {
      padding: 8px 15px;
      background: linear-gradient(90deg, rgb(253, 124, 4) 0%, red 100%);
      color: #fff;
      font-size: 14px;
      border-radius: 20px;
    }
  }
  .van-dialog {
    .content {
      padding: 10px 20px;
    }
  }
}
</style>
