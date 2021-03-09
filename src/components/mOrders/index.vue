<template>
  <div class="orders">
    <div class="item" v-for="item in orders" :key="item.oid" @click="$emit('itemClick', item.oid)">
      <div class="content">
        <div class="left">
          <img :src="$serveUrl + item.thumbnail" alt="">
        </div>
        <div class="mid">
          <div class="title">{{item.title}}</div>
          <div class="number">X {{item.number}}</div>
        </div>
        <div class="right">
          ￥{{item.orderMoney}}
        </div>
      </div>
      <div class="msg">
        <div class="time">{{item.createdTime | timeFormat}}</div>
        <div class="btn">{{item.isComplete ? '已关闭' : '进行中'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    timeFormat(time) {
      const timeArr = time.split('T');
      return `${timeArr[0]} ${timeArr[1].split('.')[0]}`;
    },
  },
};
</script>
<style lang="less" scoped>
.orders {
  > .item {
    margin: 20px 0;
    border-radius: 20px;
    background: @gray-bgc;
    > .content {
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
      > .left {
        margin: 0 20px;
        > img {
          width: 70px;
        }
      }
      > .mid {
        width: 150px;
        color: #333;
        > .title {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      > .right {
        font-size: 16px;
        color: red;
      }
    }
    > .msg {
      height: 40px;
      margin: 0 20px;
      line-height: 40px;
      border-top: 1px solid rgb(218, 214, 214);
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
