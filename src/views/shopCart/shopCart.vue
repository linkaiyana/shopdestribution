<template>
  <div id="shop-cart">
    <m-nav-bar :title="`购物车(${cartNum})`" :fixed="true" :placeholder="true" :bg="true"></m-nav-bar>
    <div class="goods">
      <van-swipe-cell v-for="(item, index) in goods" :key="item.id">
        <div class="content" @click="toDetail(item.id)">
          <div class="left">
            <img :src="$serveUrl + item.thumbnail" alt="">
          </div>
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="price">￥{{item.discountPrice}}</div>
          </div>
          <div class="add" @click.stop>
            <van-stepper v-model="item.number" integer @change="changeNumber(item.id, item.number)" />
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.id, index)"/>
        </template>
      </van-swipe-cell>
    </div>
    <div class="compute">
      总计：￥{{sumPrice}}
      <div class="btn" @click="toPay">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import {
  SwipeCell, Button, Stepper,
} from 'vant';
import mNavBar from 'components/mNavBar.vue';
import { getShopCart, changeGoodsNum, deleteFromCart } from 'api/shopcart';

export default {
  name: 'shopCart',
  data() {
    return {
      cartNum: 0,
      goods: [],
      showComfirm: false,
    };
  },
  components: {
    mNavBar,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
  },
  computed: {
    sumPrice() {
      return this.goods.reduce((total, item) => total + item.discountPrice * item.number, 0).toFixed(2);
    },
  },
  methods: {
    toPay() {
      const ids = [];
      this.goods.forEach((item) => {
        ids.push({
          id: item.id,
          number: item.number,
        });
      });
      console.log(ids);
      this.$router.push({
        path: 'payment',
        query: {
          ids: JSON.stringify(ids),
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
    deleteGoods(id, index) {
      const data = {
        uid: JSON.parse(localStorage.getItem('userInfo')).id,
        id,
      };
      deleteFromCart(data).then((res) => {
        if (res.status === 200) {
          this.goods.splice(index, 1);
          this.cartNum = this.goods.length;
        }
      });
    },
    changeNumber(id, number) {
      const data = {
        number,
        uid: JSON.parse(localStorage.getItem('userInfo')).id,
        id,
      };
      if (number && id) {
        changeGoodsNum(data).then((res) => {
          console.log(res);
        });
      }
      return false;
    },
  },
  created() {
    // 获取购物车列表
    getShopCart({
      uid: JSON.parse(localStorage.getItem('userInfo')).id,
    }).then((res) => {
      this.goods = res.data;
      this.cartNum = res.data.length;
    });
  },
};
</script>
<style lang="less" scoped>
#shop-cart {
  width: 100%;
  min-height: calc(100% - 50px);
  background: @gray-bgc;
  padding-bottom: 40px;
  .goods {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    /deep/ .van-swipe-cell {
      background: #fff;
      margin-bottom: 10px;
    }
    .content {
      height: 104px;
      display: flex;
       .left {
         margin: 0 10px;
        img {
          width: 100px;
        }
      }
      > .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 104px;
        > .price {
          color: red;
        }
      }
      > .add {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .delete-button {
      height: 100%;
    }
  }
  .compute {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding-left: 20px;
    background: #fff;
    line-height: 40px;
    > .btn {
      width: 150px;
      background: rgb(255, 60, 0);
      text-align: center;
      color: #fff;
    }
  }
}
</style>
