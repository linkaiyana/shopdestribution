<template>
  <div class="order-detail">
    <m-nav-bar title="订单详情" :bg="true" :placeholder="true" :fixed="true" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <div class="content">
      <div class="address">
        <div class="leftIcon">
          <img src="~assets/imgs/location.png" alt="">
        </div>
        <div class="address-msg">
          <div class="info">
            <span class="name">{{orderMsg.receiveName}}</span>
            <span class="phone">{{orderMsg.chatPhone}}</span>
          </div>
          <div class="title">{{orderMsg.address + orderMsg.detailAddress}}</div>
        </div>
      </div>
      <div class="msg">
        <div class="goods" v-for="item in ordergoods" :key="item.id">
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
        </div>
      </div>
      <div class="info">
        <span class="item">订单编号： {{orderMsg.oid}}</span>
        <span class="item" @click="show=true">订单状态： {{ orderMsg.isComplete ? '已完成' : orderMsg.status === 2 ? '已送达' : orderMsg.status === 1 ? '已发货' : '待发货'}}</span>
        <span class="item">订单金额： {{orderMsg.orderMoney}}</span>
        <span class="item">订单创建时间： {{orderMsg.createdTime | timeformat}}</span>
      </div>
    </div>
    <div class="fix-btn">
      <div class="delete" @click="delOrder">删除订单</div>
      <div class="confirm" @click="changeStatus">确认</div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { Dialog, ActionSheet } from 'vant';
import mNavBar from 'components/mNavBar.vue';
import {
  getOrderBase, getOrderGoods, delOrder,
} from 'api/orderdetail';
import { changeStatus } from 'api/manage';

export default {
  name: 'setOrders',
  data() {
    return {
      id: this.$route.query.id,
      orderMsg: {},
      ordergoods: [],
      show: false,
      actions: [{
        name: '待发货',
        value: 0,
      }, {
        name: '已发货',
        value: 1,
      }, {
        name: '已送达',
        value: 2,
      }],
    };
  },
  components: {
    mNavBar,
    [ActionSheet.name]: ActionSheet,
  },
  filters: {
    timeformat(time) {
      if (time) {
        const timeArr = time.split('T');
        return `${timeArr[0]} ${timeArr[1].split('.')[0]}`;
      }
      return '';
    },
  },
  methods: {
    changeStatus() {
      const data = {
        status: this.orderMsg.status,
        id: this.$route.query.id,
      };
      changeStatus(data).then((res) => {
        if (res.status === 200) {
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    },
    delOrder() {
      Dialog.confirm({
        title: '提示',
        message: '确认删除该订单吗？删除后无法找回',
      }).then(() => {
        this.$toast.loading({
          duration: 0,
        });
        delOrder({ id: this.id }).then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      }).catch();
    },
    onSelect(val) {
      this.orderMsg.status = val.value;
      this.show = false;
    },
  },
  created() {
    // 获取地址和订单基本信息
    getOrderBase({ id: this.id }).then((res) => {
      this.orderMsg = res.data[0];
    });
    // 获取订单商品
    getOrderGoods({ id: this.id }).then((res) => {
      this.ordergoods = res.data;
    });
  },
};
</script>
<style lang="less" scoped>
.order-detail {
  width: 100%;
  > .content {
    width: 100%;
      > .address {
        display: flex;
        align-items: center;
        padding: 20px 20px;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
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
          width: 280px;
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
      >.msg {
        margin-top: 20px;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
        // border-radius: 20px;
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
              width: 200px;
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
        }
      }
      > .info {
        display: flex;
        flex-direction: column;
        padding: 20px;
        font-size: 12px;
        color: #333;
        .item {
          margin-bottom: 10px;
        }
      }
  }
  > .fix-btn {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 20px;
    > .delete {
      box-sizing: border-box;
      line-height: 30px;
      padding: 0 10px;
      height: 30px;
      border: 1px solid #333;
      border-radius: 15px;
      margin-right: 15px;
    }
    > .confirm {
      box-sizing: border-box;
      line-height: 30px;
      padding: 0 10px;
      height: 30px;
      color: #fff;
      background: linear-gradient(90deg, rgb(253, 124, 4) 0%, red 100%);
      border: 1px solid transparent;
      border-radius: 15px;
      margin-right: 20px;
    }
  }
}
</style>
