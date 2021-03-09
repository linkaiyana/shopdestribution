<template>
  <div class="set-hot">
    <m-nav-bar fixed title="今日热卖" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <van-tabs sticky offset-top="46">
      <van-tab class="hot" title="当前热卖">
        <van-pull-refresh v-model="loading" @refresh="onRefresh(1)">
          <div class="con">
            <div class="no-data" v-if="hots.length <= 0">
              暂时没有商品哦
            </div>
            <div class="goodsItem" v-for="item in hots" :key="item.id">
              <div class="goods-id">
                <div>id</div>{{item.id}}
              </div>
              <img :src="$serveUrl + item.thumbnail" alt="">
              <div class="content">
                <div>商品名称： {{item.goodsName}}</div>
                <div>当前售价： {{item.discountPrice}}</div>
                <div>剩余库存： {{item.stock}}</div>
                <div>商品类型： {{item.tag}}</div>
              </div>
              <van-switch v-model="item.isHot" size="20" @change="changeState(item.id, $event)" />
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab class="all" title="全部商品">
        <van-pull-refresh v-model="loading" @refresh="onRefresh(1)">
          <div class="con">
            <div class="no-data" v-if="goods.length <= 0">
              暂时没有商品哦
            </div>
            <div class="goodsItem" v-for="item in goods" :key="item.id">
              <div class="goods-id">
                <div>id</div>{{item.id}}
              </div>
              <img :src="$serveUrl + item.thumbnail" alt="">
              <div class="content">
                <div>商品名称： {{item.goodsName}}</div>
                <div>当前售价： {{item.discountPrice}}</div>
                <div>剩余库存： {{item.stock}}</div>
                <div>商品类型： {{item.tag}}</div>
              </div>
              <van-switch v-model="item.isHot" size="20" @change="changeState(item.id, $event)" />
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import {
  Tabs, Tab, Switch, PullRefresh,
} from 'vant';
import { getHotBase, changeHotState, getAllGoods } from 'api/manage';

export default {
  name: 'setHot',
  data() {
    return {
      hots: [],
      goods: [],
      loading: false,
    };
  },
  components: {
    mNavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Switch.name]: Switch,
    [PullRefresh.name]: PullRefresh,
  },
  methods: {
    getHotBase() {
      getHotBase().then((res) => {
        this.hots = res.data;
        this.hots.forEach((item) => {
          item.isHot = !!Number(item.isHot);
        });
      });
    },
    getAllGoods() {
      getAllGoods().then((res) => {
        this.goods = res.data;
        this.goods.forEach((item) => {
          item.isHot = !!Number(item.isHot);
        });
      });
    },
    changeState(id, state) {
      const isHot = state ? 1 : 0;
      const data = {
        isHot,
        id,
      };
      changeHotState(data).then((res) => {
        console.log(res);
      });
    },
    async onRefresh(type) {
      if (type === 1) {
        await this.getHotBase();
        this.loading = false;
      } else {
        await this.getAllGoods();
        this.loading = false;
      }
    },
  },
  created() {
    this.getHotBase();
    this.getAllGoods();
  },
};
</script>
<style lang="less" scoped>
.set-hot {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #b9ebff 0%, #faf9f9 100%);
  /deep/ .van-tabs__nav {
    background: #b9ebff;
  }
  .hot, .all {
    .con {
      background: linear-gradient(180deg, #b9ebff 0%, #ffffff 100%);
      > .no-data {
        font-size: 14px;
        text-align: center;
        padding: 50px;
      }
      > .goodsItem {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        > .goods-id {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgb(253, 124, 31);
          color: #fff;
          font-size: 22px;
          font-weight: bold;
          line-height: 50px;
          text-align: center;
          > div {
            position: absolute;
            left: 0;
            top: 0;
            font-size: 14px;
            color: red;
            line-height: 14px;
          }
        }
        > img {
          width: 80px;
          height: 80px;
          margin: 0 20px;

        }
        > .content {
          width: 120px;
          height: 100%;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
