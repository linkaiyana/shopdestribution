<template>
  <div class="add-goods">
    <m-nav-bar fixed :title="$route.query.id ? '编辑商品' : '添加商品'" :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <div class="content">
      <van-field v-model="goods.title" label="标题" placeholder="请输入商品介绍"></van-field>
      <van-field v-model="goods.goodsName" label="商品名称" placeholder="请输入商品名称"></van-field>
      <van-field v-model="goods.originPlace" label="产地" placeholder="请输入商品产地"></van-field>
      <van-field v-model="goods.specifications" label="规格" placeholder="请输入商品规格"></van-field>
      <van-field v-model="goods.goodsPrice" label="商品价格" placeholder="请输入商品价格"></van-field>
      <van-field v-model="goods.discountPrice" label="折扣价" placeholder="请输入折扣价"></van-field>
      <van-field v-model="goods.stock" label="库存" placeholder="请输入库存量"></van-field>
      <van-field name="switch" label="设为热卖商品">
        <template #input>
          <van-switch v-model="goods.isHot" size="20" />
        </template>
      </van-field>
      <div class="tags">
        <div class="title">
          商品分类（点击选择）
        </div>
        <span class="tag" :class="{selected: goods.tag === item.id}" v-for="item in tags" :key="item.id" @click="goods.tag = item.id">{{item.category}}</span>
      </div>
      <div class="label" v-if="!this.$route.query.id">
        <div class="title">
          商品详情图（请注意上传顺序，第一张为商品缩略图）
        </div>
        <m-upload :i="2" :list="detailImgs" :num="6"></m-upload>
      </div>
    </div>
    <div class="btn">
      <van-button v-if="!$route.query.id" class="add" round type="info" size="large" @click="addGoods">添加</van-button>
      <van-button v-else class="add" round type="info" size="large" @click="updateGoods">确认修改</van-button>
      <van-button v-if="$route.query.id" round size="large" @click="delGoods">删除</van-button>
    </div>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import { Field, Switch, Button } from 'vant';
import mUpload from 'components/mUpload/index.vue';
import {
  getGoodsCategory, addGoods, updateGoodsById, delGoodsById,
} from 'api/manage';
import { getGoodsById } from 'api/home';

export default {
  name: 'addGoods',
  data() {
    return {
      goods: {
        title: '',
        goodsName: '',
        originPlace: '',
        specifications: '',
        goodsPrice: null,
        discountPrice: null,
        stock: null,
        isHot: false,
        tag: 0,
      },
      detailImgs: [],
      tags: [],
    };
  },
  components: {
    mUpload,
    mNavBar,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Button.name]: Button,
  },
  methods: {
    // 获取商品分类
    getGoodsCategory() {
      getGoodsCategory().then((res) => {
        this.tags = res.data;
        this.goods.tag = this.tags[0].id;
      });
    },
    // 添加商品
    addGoods() {
      const data = this.detailImgs[0];
      this.goods.isHot = this.goods.isHot ? 1 : 0;
      data.append('data', JSON.stringify(this.goods));
      addGoods(data).then((res) => {
        if (res.status === 200) {
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    },
    // 更新商品信息
    updateGoods() {
      const data = {
        id: this.$route.query.id,
        ...this.goods,
      };
      data.isHot = data.isHot ? 1 : 0;
      updateGoodsById(data).then((res) => {
        if (res.status === 200) {
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$route.go(-1);
          }, 2000);
        }
      });
    },
    // 删除商品
    delGoods() {
      delGoodsById({ id: this.$route.query.id }).then((res) => {
        if (res.status === 200) {
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    },
  },
  created() {
    // 获取商品分类
    this.getGoodsCategory();
    if (this.$route.query.id) {
      // 获取商品信息
      getGoodsById(this.$route.query.id).then((res) => {
        this.goods.title = res.data[0].title;
        this.goods.goodsName = res.data[0].goodsName;
        this.goods.originPlace = res.data[0].originPlace;
        this.goods.specifications = res.data[0].specifications;
        this.goods.goodsPrice = res.data[0].goodsPrice;
        this.goods.discountPrice = res.data[0].discountPrice;
        this.goods.stock = res.data[0].stock;
        this.goods.isHot = !!Number(res.data[0].isHot);
        this.goods.tag = res.data[0].tag;
      });
    }
  },
};
</script>
<style lang="less" scoped>
.add-goods {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #e1e3fa 0%, #faf9f9 100%);
  > .content {
    padding: 20px 20px;
    > .tags {
        margin-left: 15px;
      > .title {
        color: #646566;
        font-size: 14px;
        margin-bottom: 20px;
      }
      > .tag {
        font-size: 12px;
        padding: 2px 3px;
        margin-right: 10px;
        border: 1px solid @theme-color;
        border-radius: 5px;
        &.selected {
          background: @theme-color;
          color: #fff;
        }
      }
    }
    > .label {
      color: #646566;
      font-size: 14px;
      // margin-left: 15px;
      > .title {
        margin: 20px 0;
      }
    }
  }
  > .btn {
    padding: 0 20px;
    > .van-button {
      margin-bottom: 20px;
    }
  }
}

/deep/ .van-cell {
  background: transparent;
}
</style>
