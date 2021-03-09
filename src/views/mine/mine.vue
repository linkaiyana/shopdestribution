<template>
  <div id="mine">
    <div class="header">
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
        placement="bottom-end"
        class="pop"
      >
        <template #reference>
          <img class="set" src="~@/assets/imgs/set.png" alt="">
        </template>
      </van-popover>
      <div class="userInfo">
        <div class="avatar-wrap" @click="previewImage">
          <img class="avatar" :src="$serveUrl + avatar" alt="">
          <img class="genderIcon" :src="getUserGender" alt="">
        </div>
        <div class="user">
          <div class="username">{{nickName}}</div>
          <div class="phone">{{userPhone}}</div>
        </div>
      </div>
    </div>
    <div class="handle-list">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item class="list-item" title="我的订单" name="1">
          <van-tabs v-model="active" @click="tabChange">
            <van-tab title="全部">
              <div class="no-data" v-if="allOrder.length === 0">
                您还没有订单哦
              </div>
              <m-orders :orders="allOrder" @itemClick="itemClick"></m-orders>
            </van-tab>
            <van-tab title="待发货">
              <div class="no-data" v-if="allUnDeliveredOrder.length === 0">
                您还没有待发货的订单哦
              </div>
              <m-orders :orders="allUnDeliveredOrder" @itemClick="itemClick"></m-orders>
            </van-tab>
            <van-tab title="已发货">
              <div class="no-data" v-if="allDeliveredOrder.length === 0">
                您还没有已发货的订单哦
              </div>
              <m-orders :orders="allDeliveredOrder" @itemClick="itemClick"></m-orders>
            </van-tab>
            <van-tab title="已送达">
              <div class="no-data" v-if="allArrivedOrder.length === 0">
                您还没有已送达的订单哦
              </div>
              <m-orders :orders="allArrivedOrder" @itemClick="itemClick"></m-orders>
            </van-tab>
            <van-tab title="已完成">
               <div class="no-data" v-if="allCompleteOrder.length === 0">
                您还没有已完成的订单哦
              </div>
              <m-orders :orders="allCompleteOrder" @itemClick="itemClick"></m-orders>
            </van-tab>
          </van-tabs>
        </van-collapse-item>
        <van-collapse-item class="list-item" title="我的收藏" name="2">
          <div class="m-collection" v-for="item in collection" :key="item.id" @click="toDetail(item.id)">
            <div class="left">
              <img :src="$serveUrl + item.thumbnail" alt="">
            </div>
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="info">
                <span class="originPlace">{{item.originPlace}}</span>
                <span class="stock">{{item.stock}}</span>
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item class="list-item" title="我的收货地址" name="3">
          <div class="m-address" v-for="item in address" :key="item.id">
            <div class="left">
              <div class="tag" v-if="item.isDefault"><span>默认</span></div>
              <div class="address">{{item.address}}</div>
              <div class="info">
                <div class="receive-name">{{item.receiveName}}</div>
                <div class="chat-phone">{{item.chatPhone}}</div>
              </div>
            </div>
            <div class="right" @click="editAddress(item.id)">
              <img src="~assets/imgs/edit.png" alt="">
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import {
  ImagePreview, Popover, Collapse, CollapseItem, Tabs, Tab,
} from 'vant';
import mOrders from 'components/mOrders/index.vue';
import {
  getAddressByUserPhone, getCollection, getAllOrder, getAllUnDeliveredOrder, getAllDeliveredOrder, getAllArrivedOrder, getAllCompleteOrder,
} from 'api/mine';

export default {
  name: 'mine',
  data() {
    return {
      active: 0,
      gender: 1,
      nickName: '',
      userPhone: '',
      avatar: '',
      showPopover: false,
      actions: [
        { index: 0, text: '修改账号信息', icon: 'edit' },
        { index: 1, text: '添加收获地址', icon: 'add-o' },
        { index: 2, text: '注销账号', icon: require('assets/imgs/log-out.png') },
        { index: 2, text: '切换登录', icon: require('assets/imgs/toggle-login.png') },
      ],
      // 当前展开
      activeNames: [],
      address: [],
      collection: [],
      allOrder: [], // 所有订单
      allUnDeliveredOrder: [], // 未发货
      allDeliveredOrder: [], // 已发货
      allArrivedOrder: [], // 已送达
      allCompleteOrder: [], // 已完成
    };
  },
  components: {
    [Popover.name]: Popover,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    mOrders,
  },
  computed: {
    getUserGender() {
      const imgSrc = Number(this.gender) === 1 ? require('@/assets/imgs/man.png') : require('@/assets/imgs/woman.png');
      return imgSrc;
    },
  },
  methods: {
    tabChange(index) {
      const uid = JSON.parse(localStorage.getItem('userInfo')).id;
      if (index === 0) { // 全部
        getAllOrder({ uid }).then((res) => {
          this.allOrder = res.data;
        });
      } else if (index === 1) { // 待发货
        getAllUnDeliveredOrder({ uid }).then((res) => {
          this.allUnDeliveredOrder = res.data;
        });
      } else if (index === 2) { // 已发货
        getAllDeliveredOrder({ uid }).then((res) => {
          this.allDeliveredOrder = res.data;
        });
      } else if (index === 3) { // 已送达
        getAllArrivedOrder({ uid }).then((res) => {
          this.allArrivedOrder = res.data;
        });
      } else if (index === 4) { // 已完成
        getAllCompleteOrder({ uid }).then((res) => {
          this.allCompleteOrder = res.data;
        });
      }
    },
    itemClick(id) {
      this.$router.push({
        path: '/order-detail',
        query: {
          id,
        },
      });
    },
    toDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        },
      });
    },
    // 头像预览
    previewImage() {
      console.log(process.env);
      ImagePreview([
        this.$serveUrl + this.avatar,
      ]);
    },
    onSelect(action) {
      if (action.index === 0) {
        console.log(0);
      } else if (action.index === 1) {
        this.$router.push('/setAddress');
      } else if (action.index === 2) {
        console.log(2);
      }
    },
    initData() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.avatar = userInfo.avatar;
      this.nickName = userInfo.nickName;
      this.userPhone = userInfo.userPhone;
      this.gender = userInfo.gender;
    },
    getAddress() {
      getAddressByUserPhone({ uid: JSON.parse(localStorage.getItem('userInfo')).id }).then((res) => {
        this.address = res.data;
      });
    },
    editAddress(id) {
      console.log(id);
      this.$router.push({
        path: '/setAddress',
        query: {
          id,
        },
      });
    },
  },
  created() {
    // 数据初始化
    this.initData();
    // 获取收获地址
    this.getAddress();
    // 获取收藏
    getCollection({
      uid: JSON.parse(localStorage.getItem('userInfo')).id,
    }).then((res) => {
      this.collection = res.data;
    });
    // 获取全部订单
    getAllOrder({
      uid: JSON.parse(localStorage.getItem('userInfo')).id,
    }).then((res) => {
      this.allOrder = res.data;
    });
  },
};
</script>
<style lang="less" scoped>
#mine {
  width: 100%;
  height: calc(100% - 50px);
  background-color: @gray-bgc;
  > .header {
    position: relative;
    height: 250px;
    background-color: @theme-color;
    border-radius: 0 0 150px 80px;
    > .pop {
      position: absolute;
      right: 20px;
      top: 20px;
      > .set {
        width: 40px;
        height: 40px;
      }
    }
    > .userInfo {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 80px;
      // background-color: #ccc;
      transform: translateY(40%);
      > .avatar-wrap {
        position: relative;
        width: 80px;
        height: 80px;
        margin-left: 30px;
        border-radius: 50%;
        > .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        > .genderIcon {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 25px;
          height: 25px;
          transform: translate(-50%, 40%);
        }
      }
      > .user {
        margin-left: 20px;
        padding-top: 15px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > .username {
          color: #fff;
        }
      }
    }
  }
  > .handle-list {
    margin-top: 70px;
    margin-bottom: 50px;
    .list-item {
      margin-bottom: 10px;
      .no-data {
        padding: 20px 10px;
      }
      .m-collection {
        display: flex;
        padding: 20px 0;
        border-radius: 20px;
        background: @gray-bgc;
        margin-bottom: 20px;
        .left {
          width: 50px;
          margin-right: 20px;
          margin-left: 20px;
          > img {
            width: 100%;
          }
        }
        .right {
          width: 250px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          > .title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
            font-size: 16px;
          }
          > .info {
            > .originPlace {
              margin-right: 10px;
            }
          }
        }
      }
      .m-address {
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px;
        background: @gray-bgc;
        border-radius: 20px;
        margin-bottom: 20px;
        > .left {
          display: flex;
          flex-direction: column;
          width: 260px;
          > .tag {
            position: absolute;
            transform: rotate(-45deg);
            left: -25px;
            top: -25px;
            width: 50px;
            height: 50px;
            background:  red;
            color: #fff;
            font-size: 12px;
            > span {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              text-align: center;
            }
          }
          > .address {
            font-size: 18px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          > .info {
            display: flex;
            > .receive-name {
              margin-right: 10px;
            }
          }
        }
        > .right {
          > img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .list-item:last-child {
      padding-bottom: 50px;
    }
  }
}
</style>
