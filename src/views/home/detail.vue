<template>
  <div id="detail">
    <m-nav-bar :title="goodsInfo.goodsName ? goodsInfo.goodsName : '商品详情'" :fixed="true" :placeholder="true" :bg="true" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <van-swipe autoplay="5000">
      <van-swipe-item v-for="item in goodsInfo.detailImgs" :key="item.id">
        <img :src="$serveUrl + item" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="msg">
      <div class="title">
        {{goodsInfo.title}}
        <span class="hoticon" v-if="goodsInfo.isHot">热卖</span>
      </div>
      <div class="price">
        <div class="discount-price">{{goodsInfo.discountPrice}}</div>
        <div class="goods-price">{{goodsInfo.goodsPrice}}</div>
      </div>
    </div>
    <div class="info">
      <div>
        <span>商品名称：</span>{{goodsInfo.goodsName}}
      </div>
      <div>
        <span>产地：</span>{{goodsInfo.originPlace}}
      </div>
      <div>
        <span>规格：</span>{{goodsInfo.specifications}}
      </div>
      <div>
        <span>库存：</span>{{goodsInfo.stock}}
      </div>
      <div>
        <span>商品类别：</span>{{goodsInfo.tag}}
      </div>
    </div>
    <div class="seize"></div>
    <div class="bottom-tab">
      <div class="dis" v-if="!!Number(goodsInfo.is_del)">该商品已下架</div>
      <div class="collect" @click="collect">
        <img v-if="!this.isCollected" src="~assets/imgs/collect.png" alt="">
        <img v-else src="~assets/imgs/collect-selected.png" alt="">
        <!-- <img src="~assets/imgs/collect-selected.png" alt=""> -->
      </div>
      <div class="addtocart" :class="{disabled: isInCart}" @click="addToCart">加入购物车</div>
      <div class="buy" @click="toBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
import {
  Swipe, SwipeItem,
} from 'vant';
import mNavBar from 'components/mNavBar.vue';
import { getGoodsById } from 'api/home';
import { getGoodsCategory } from 'api/manage';
import {
  collect, collectStatus, cCollect, addToCart, inCartStatus,
} from 'api/detail';

export default {
  name: 'detail',
  data() {
    return {
      goodsInfo: {},
      isCollected: false,
      isInCart: false,
    };
  },
  components: {
    mNavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  methods: {
    toBuy() {
      const ids = [{
        id: this.goodsInfo.id,
        number: 1,
      }];
      this.$router.push({
        path: 'payment',
        query: {
          ids: JSON.stringify(ids),
        },
      });
    },
    collect() {
      const data = {
        uid: JSON.parse(localStorage.getItem('userInfo')).id,
        collectId: this.$route.query.id,
      };
      if (this.isCollected) {
        cCollect(data).then((res) => {
          if (res.status === 200) {
            this.isCollected = false;
            this.$toast.success(res.msg);
          }
        });
      } else {
        collect(data).then((res) => {
          if (res.status === 200) {
            this.isCollected = true;
            this.$toast.success(res.msg);
          }
        });
      }
    },
    addToCart() {
      if (this.isInCart) {
        return;
      }
      const data = {
        uid: JSON.parse(localStorage.getItem('userInfo')).id,
        id: this.$route.query.id,
      };
      addToCart(data).then((res) => {
        if (res.status === 200) {
          this.isInCart = true;
          this.$toast.success(res.msg);
        }
      });
    },
    async getGoodsCategory() {
      await getGoodsCategory().then((res) => {
        this.tags = res.data;
      });
    },
    getDetail() {
      getGoodsById(this.$route.query.id).then((res) => {
        this.goodsInfo = res.data[0];
        this.goodsInfo.detailImgs = JSON.parse(this.goodsInfo.detailImgs);
        this.goodsInfo.goodsPrice = this.goodsInfo.goodsPrice.toFixed(2);
        this.goodsInfo.discountPrice = this.goodsInfo.discountPrice.toFixed(2);
        this.goodsInfo.tag = this.tags.find((item) => item.id === this.goodsInfo.tag).category;
      });
    },
  },
  async created() {
    await this.getGoodsCategory();
    this.getDetail();
    collectStatus({
      uid: JSON.parse(localStorage.getItem('userInfo')).id,
      collectId: this.$route.query.id,
    }).then((res) => {
      this.isCollected = res.data;
    });
    inCartStatus({
      uid: JSON.parse(localStorage.getItem('userInfo')).id,
      id: this.$route.query.id,
    }).then((res) => {
      this.isInCart = res.data;
    });
  },
};
</script>
<style lang="less" scoped>
#detail {
  .van-swipe {
    width: 375px;
    height: 375px;
    img{
      width: 100%;
    }
  }
  > .msg {
    width: 335px;
    margin: 10px auto 0;
    padding-bottom: 8px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    > .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      > .hoticon {
        position: relative;
        top: -7px;
        font-size: 12px;
        background: red;
        color: #fff;
        padding: 2px 4px;
        border-radius: 8px;
        font-weight: normal;
      }
    }
    > .price {
      display: flex;
      align-items: flex-end;
      margin: 15px 0;
      > .discount-price {
        font-size: 25px;
        color: red;
        font-weight: 700;
        margin-right: 10px;
      }
      > .goods-price {
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
  > .info {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    padding: 20px;
    color: #999;
    > div {
      width: 50%;
    }
  }
  > .seize {
    height: 40px;
  }
  > .bottom-tab {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    padding-bottom: 10px;
    display: flex;
    background: #fff;
    > .dis {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      background: rgba(0, 0, 0, .7);
      color: #fff;
      text-align: center;
      line-height: 44px;
    }
    > .collect {
      padding: 0 15px;
      img {
        width: 30px;
      }
    }
    > .addtocart {
      text-align: center;
      color: #eee;
      line-height: 30px;
      width: 150px;
      background: red;
      border-radius: 15px 0 0 15px;
      &.disabled {
        background: #999;
      }
    }
    > .buy {
      text-align: center;
      color: #eee;
      line-height: 30px;
      width: 150px;
      background: orange;
      border-radius: 0 15px 15px 0;
    }
  }
}
</style>
