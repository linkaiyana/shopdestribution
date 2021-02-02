<template>
  <div id="shop-cart">
    <Tabbar v-model="active" fixed :placeholder="true" :route="true">
      <TabbarItem icon="wap-home-o" to="/home">主页</TabbarItem>
      <TabbarItem icon="shopping-cart-o" to="/shopCart">购物车</TabbarItem>
      <TabbarItem icon="user-circle-o" to="/mine">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'shopCart',
  data() {
    return {
      active: 2,
    };
  },
  components: {
    Tabbar, TabbarItem,
  },
};
</script>
<style lang="less" scoped>
#shop-cart {
  /deep/ .van-tabbar--fixed {
    bottom: -3px;
  }
}
</style>
