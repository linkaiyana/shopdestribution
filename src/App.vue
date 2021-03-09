<template>
  <div id="app">
    <router-view/>
    <div v-show="isTabbarShow" class="fix-bottom"></div>
    <van-tabbar v-show="isTabbarShow" v-model="active" fixed :placeholder ="true" :route="true">
      <template v-for="item in tabList">
        <van-tabbar-item v-if="item.isShow" :key="item.name" :icon="item.icon" :to="item.path">{{item.name}}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return {
      active: 0,
      // 是否管理员
      isAdmin: 0,
      isTabbarShow: false,
      tabList: [{
        name: '主页',
        path: '/home',
        icon: 'wap-home',
        isShow: true,
      }, {
        name: '管理',
        path: '/manage',
        icon: 'cluster',
        isShow: false,
      }, {
        name: '购物车',
        path: '/shopCart',
        icon: 'shopping-cart',
        isShow: true,
      }, {
        name: '我的',
        path: '/mine',
        icon: 'manager',
        isShow: true,
      }],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        console.log(to);
        this.isTabbarShow = Boolean(this.tabList.find((item) => item.path === to.path));
      },
    },
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  created() {
    // 监听存储变化，登录后触发
    this.$bus.$on('userInfoChange', () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.adminFlag) {
        this.isAdmin = 1;
        this.tabList[1].isShow = this.isAdmin === 1;
      }
    });
    // 读取存储，刷新触发
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.adminFlag) {
      this.isAdmin = 1;
      this.tabList[1].isShow = this.isAdmin === 1;
    }
  },
};
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.fix-bottom {
  height: 50px;
}

// // 自定义info按钮颜色
// .van-button--info {
//   background-color: @theme-color !important;
//   border: 0.0625rem solid @theme-color !important;
// }

// 自定义渐变色按钮颜色
.linear-btn {
  color: white !important;
  background: linear-gradient(to right, rgb(218, 216, 216), @theme-color) !important;
  border: 0px !important;
}

// // 自定义单选按钮颜色
// .van-radio__icon--checked .van-icon{
//   border-color: @theme-color !important;
//   background-color: @theme-color !important;
// }

// // 自定义checkbox颜色
// .van-checkbox__icon--checked .van-icon {
//   background-color: @theme-color !important;
// }
</style>
