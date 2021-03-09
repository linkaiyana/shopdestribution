<template>
  <div class="set-goods">
    <m-nav-bar title="商品信息管理" :isShowLeft="true" bg="#b9ebff" fixed @clickLeft="$router.go(-1)"></m-nav-bar>
    <van-search v-model="serachTxt" background="#b9ebff" shape="round" placeholder="输入商品名称或商品id" clearable @search="search"></van-search>
    <div class="content">
      <div class="no-data" v-if="goods.length <= 0">
        暂时没有商品哦
      </div>
      <div class="goodsItem" v-for="item in goods" :key="item.id" @click="$router.push({ path: '/addGoods', query: { id: item.id } })">
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
      </div>
    </div>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import { Search } from 'vant';
import { getAllGoods, getBaseById, getBaseByName } from 'api/manage';

export default {
  name: 'setGoods',
  data() {
    return {
      serachTxt: '',
      goods: [],
    };
  },
  components: {
    mNavBar,
    [Search.name]: Search,
  },
  methods: {
    search() {
      console.log('搜索');
      if (this.serachTxt === '') {
        // 获取所有商品
        this.getAllGoods();
      } else if (Number.isNaN(Number(this.serachTxt))) {
        // 按名称搜索
        this.getBaseByName(this.serachTxt);
      } else {
        // 按id搜索
        this.getBaseById(this.serachTxt);
      }
    },
    getAllGoods() {
      getAllGoods().then((res) => {
        this.goods = res.data;
      });
    },
    getBaseById(id) {
      getBaseById({ id }).then((res) => {
        this.goods = res.data;
      });
    },
    getBaseByName(searchTxt) {
      getBaseByName({ searchTxt }).then((res) => {
        this.goods = res.data;
      });
    },
  },
  created() {
    // 获取所有商品
    this.getAllGoods();
  },
};
</script>
<style lang="less" scoped>
.set-goods {
  width: 100%;
  height: 100%;
  /deep/ .van-search {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 999;
  }
  > .content {
    margin-top: 54px;
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
        height: 100%;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}
</style>
