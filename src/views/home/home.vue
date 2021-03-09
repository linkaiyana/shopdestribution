<template>
  <div id="home">
    <m-nav-bar title="诚悦商店" :fixed="true" :placeholder="true" :bg="true"></m-nav-bar>
    <van-swipe class="swipe" autoplay="5000">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img :src="$serveUrl + item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="hot">
        <div class="title">
          <div class="icon"></div>
          今日热卖
        </div>
        <goods :goods="hotGoods"></goods>
      </div>
      <div class="like">
        <div class="title">
          <div class="icon"></div>
          猜你喜欢
        </div>
        <van-tabs class="tab" v-model="active" @click="changeTab">
          <van-tab v-for="item in tags" :key="item.id" :title="item.category">
            <goods :goods="likeGoods"></goods>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import mUpload from 'components/mUpload';
import {
  Swipe, SwipeItem, Tabs, Tab,
} from 'vant';
import mNavBar from 'components/mNavBar.vue';
import goods from 'components/goods/index.vue';
import { getBanner, getHot, getGoodsByTag } from 'api/home';
import { getGoodsCategory } from 'api/manage';

export default {
  name: 'Home',
  data() {
    return {
      banner: [],
      hotGoods: [],
      active: 0,
      tags: [],
      likeGoods: [],
    };
  },
  components: {
    mNavBar,
    goods,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  methods: {
    // 获取商品分类
    async getGoodsCategory() {
      await getGoodsCategory().then((res) => {
        this.tags = res.data;
      });
    },
    // 获取我的喜欢
    changeTab(index) {
      const { id } = this.tags[index];
      console.log(id);
      getGoodsByTag(id).then((res) => {
        this.likeGoods = res.data;
      });
    },
  },
  async created() {
    // 获取轮播图数据
    getBanner().then((res) => {
      this.banner = res.data;
    });
    // 获取今日热卖商品
    getHot().then((res) => {
      this.hotGoods = res.data;
    });
    // 获取商品分类
    await this.getGoodsCategory();
    this.changeTab(0);
  },
};
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  padding-bottom: 50px;
  > .swipe {
    height: 218px;
    .van-swipe {
      height: 250px;
    }
    .van-swipe.item {
      height: 100%;
    }
    img {
      width: 100%;
    }
  }
  > .content {
    > .hot {
      margin: 0 auto;
      border-radius: 10px;
      background: #fff;
      overflow: hidden;
      margin-bottom: 20px;
      > .title {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 18px;
        color: #333333;
        font-weight: 700;
      > .icon {
        width: 4px;
        height: 18px;
        background: blue;
        border-radius: 4px;
        margin-right: 6px;
      }
      }
      > .goods {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        padding: 0 12px;
      }
    }
    > .like {
      > .title {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 18px;
        color: #333333;
        font-weight: 700;
      > .icon {
        width: 4px;
        height: 18px;
        background: blue;
        border-radius: 4px;
        margin-right: 6px;
        }
      }
      /deep/ .van-tabs__wrap {
        margin-bottom: 20px;
      }
    }
  }
  /deep/ .van-tabbar--fixed {
    bottom: -3px;
  }
}
</style>
