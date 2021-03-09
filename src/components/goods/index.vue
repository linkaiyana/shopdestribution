<template>
  <div class="wrap">
    <div class="good" v-for="item in goods" :key="item.id">
      <img :src="$serveUrl + item.thumbnail" alt="" @click="toDetail(item.id)">
      <div class="info">
        <span class="discountPrice">￥{{item.discountPrice}}</span>
        <span class="goodsPrice">￥{{item.goodsPrice}}</span>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  padding: 0 12px;
  .good {
    position: relative;
    width: 170px;
    border: 1px solid #999;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 60px;
    &:nth-child(2n) {
      margin-left: 10px;
    }
    > img {
      width: 100%;
    }
    > .info {
      position: absolute;
      bottom: 10px;
      width: 170px;
      > .discountPrice {
        color: red;
        font-weight: 700;
        font-size: 20px;
        margin-left: 10px;
      }
      > .goodsPrice {
        margin-left: 10px;
        color: #999;
        text-decoration: line-through;
      }
      > .title {
        padding: 0 10px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }
}

</style>
