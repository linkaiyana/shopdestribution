<template>
  <div class="manage">
    <div class="title">
      诚悦商店后台管理
    </div>
    <div class="shop-manage">
      <div class="title">
        <div class="icon"></div>
        商店管理
      </div>
      <div class="content">
        <div class="address-set" @click="toSetShop('address')">
          设置配送地址
        </div>
        <div class="hot-set" @click="toSetShop('hot')">
          设置今日热卖
        </div>
        <div class="banner-set" @click="toSetShop('banner')">
          设置轮播图片
        </div>
      </div>
    </div>
    <div class="goods-manage">
      <div class="title">
        <div class="icon"></div>
        商品管理
      </div>
      <div class="content">
        <div @click="toSetGoods('set')">
          商品信息管理
        </div>
        <div @click="toSetGoods('add')">
          添加新商品
        </div>
      </div>
    </div>
    <div class="order-manage">
      <div class="title">
        <div class="icon"></div>
        订单管理
      </div>
      <div class="content">
        <div @click="toSetOrders()">
          订单信息管理
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manage',
  methods: {
    toSetShop(type) {
      if (type === 'address') {
        this.$router.push('address-edit');
      } else if (type === 'hot') {
        this.$router.push('/setHot');
      } else if (type === 'banner') {
        this.$router.push('/setBanner');
      }
    },
    toSetGoods(type) {
      if (type === 'set') {
        this.$router.push('/setGoods');
      } else if (type === 'add') {
        this.$router.push('/addGoods');
      }
    },
    toSetOrders() {
      this.$router.push('/setOrders');
    },
  },
};
</script>
<style lang="less" scoped>
.manage {
  width: 100%;
  height: calc(100% - 50px);
  background: linear-gradient(180deg, #e1e3fa 0%, #faf9f9 100%);
  > .title {
    font-size: 26px;
    font-weight: 700;
    line-height: 62px;
    text-align: center;
  }
  > .shop-manage, .goods-manage, .order-manage {
    width: 343px;
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
    > .content {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
      // justify-content: space-between;
      > div {
        width: 100px;
        height: 100px;
        border-radius: 6px;
        padding: 20px 20px;
        margin-right: 10px;
        text-align: center;
        font-size: 14px;
        color: coral;
        font-weight: 700;
        background: linear-gradient(180deg, #b9ebff 0%, #ffffff 100%);
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
