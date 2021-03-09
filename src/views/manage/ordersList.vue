<template>
  <div class="set-orders">
    <m-nav-bar fixed title="订单信息管理" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item  @change="changeTab" v-model="value1" :options="option1" />
      <van-dropdown-item  @change="changeTab" v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="content">
        <div class="order" @click="$router.push({path: '/setOrders', query: {id: item.oid}})" v-for="item in orders" :key="item.oid">
          <div class="top">
            <div class="oid">
              订单账户：{{item.userPhone}}
            </div>
            <div class="time">
              {{item.createdTime}}
            </div>
          </div>
          <div class="bottom">
            <img :src="$serveUrl + item.thumbnail" alt="">
            <div class="middle">
              <div class="title">{{item.title}}</div>
              <div class="money">￥ {{item.orderMoney}}</div>
              <div class="status">
                <span :class="[{nodeliver: item.status === 0},{hasdeliver: item.status === 1}, {hasarrive: item.status === 2}]">{{item.status | setStatus}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import { PullRefresh, DropdownMenu, DropdownItem } from 'vant';
import {
  getAllShopOrders, getAllShopUnDeliverOrders, getAllShopDeliverOrders, getAllShopArriveOrders,
} from 'api/manage';

export default {
  name: 'ordersList',
  data() {
    return {
      loading: false,
      orders: [],
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部订单', value: 0 },
        { text: '待发货', value: 1 },
        { text: '已发货', value: 2 },
        { text: '已送达', value: 3 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '按用户排序', value: 'b' },
        { text: '按时间排序', value: 'c' },
      ],
    };
  },
  filters: {
    setStatus(status) {
      return status === 0 ? '待发货' : status === 1 ? '已发货' : '已送达';
    },
  },
  components: {
    mNavBar,
    [PullRefresh.name]: PullRefresh,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  methods: {
    changeTab(value) {
      if (value === 0) {
        this.getAllShopOrders();
      } else if (value === 1) {
        this.getAllShopUnDeliverOrders();
      } else if (value === 2) {
        this.getAllShopDeliverOrders();
      } else if (value === 3) {
        this.getAllShopArriveOrders();
      } else {
        this.sortOrders();
      }
    },
    async onRefresh() {
      this.loading = true;
      await this.changeTab(this.value1);
      this.loading = false;
    },
    getAllShopOrders() {
      getAllShopOrders().then((res) => {
        this.orders = res.data;
        this.sortOrders();
      });
    },
    getAllShopUnDeliverOrders() {
      getAllShopUnDeliverOrders().then((res) => {
        this.orders = res.data;
        this.sortOrders();
      });
    },
    getAllShopDeliverOrders() {
      getAllShopDeliverOrders().then((res) => {
        this.orders = res.data;
        this.sortOrders();
      });
    },
    getAllShopArriveOrders() {
      getAllShopArriveOrders().then((res) => {
        this.orders = res.data;
        this.sortOrders();
      });
    },
    sortOrders() {
      if (this.value2 === 'a') {
        console.log('a');
        this.orders.sort((a, b) => a.oid - b.oid);
      } else if (this.value2 === 'b') {
        console.log('b');
        this.orders.sort((a, b) => b.userPhone.charCodeAt(0) - a.userPhone.charCodeAt(0));
      } else if (this.value2 === 'c') {
        this.orders.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
      }
    },
  },
  created() {
    // 获取全部订单
    this.getAllShopOrders();
  },
};
</script>
<style lang="less" scoped>
.set-orders {
  width: 100%;
  min-height: 100%;
  background: #b9ebff;
  /deep/ .van-dropdown-menu__bar {
    background: #b9ebff;
  }
  /deep/ .van-cell {
    background: #b9ebff;
  }
  .content {
    min-height: calc(100vh - 46px - 48px);
    padding: 10px 20px;
    > .order {
      padding: 10px;
      background: #fff;
      border-radius: 20px;
      margin-bottom: 10px;
      > .top {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
        padding-bottom: 10px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
      }
      > .bottom {
        display: flex;
        font-size: 14px;
        margin-top: 10px;
        > img {
          width: 80px;
          height: 80px;
          margin-right: 20px;
        }
        > .middle {
          color: #999;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          > .title {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          > .status {
            > span {
              font-size: 12px;
              // display: inline-block;
              padding: 2px 5px;
              border-radius: 10px;
              color: #fff;
              &.nodeliver {
                background: red;
              }
              &.hasdeliver {
                background: orange;
              }
              &.hasarrive {
                background: yellowgreen;
              }
            }
          }
        }
      }
    }
  }
}
</style>
