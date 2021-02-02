<template>
  <div id="mine">
    <div class="header">
      <Popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
        placement="bottom-end"
        class="pop"
      >
        <template #reference>
          <img class="set" src="~@/assets/imgs/set.png" alt="">
        </template>
      </Popover>
      <div class="userInfo">
        <div class="avatar-wrap" @click="previewImage">
          <img class="avatar" :src="avatar" alt="">
          <img class="genderIcon" :src="getUserGender" alt="">
        </div>
        <div class="user">
          <div class="username">{{nickName}}</div>
          <div class="phone">{{userPhone}}</div>
        </div>
      </div>
    </div>
    <div class="handle-list">
      <Collapse v-model="activeNames" accordion>
        <CollapseItem class="list-item" title="我的订单" name="1">内容一</CollapseItem>
        <CollapseItem class="list-item" title="我的收藏" name="2">内容二</CollapseItem>
        <CollapseItem class="list-item" title="我的收货地址" name="3">内容三</CollapseItem>
      </Collapse>
    </div>

    <Tabbar v-model="active" fixed :placeholder="true" :route="true">
      <TabbarItem icon="wap-home-o" to="/home">主页</TabbarItem>
      <TabbarItem icon="shopping-cart-o" to="/shopCart">购物车</TabbarItem>
      <TabbarItem icon="user-circle-o" to="/mine">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import {
  Tabbar, TabbarItem, ImagePreview, Popover, Collapse, CollapseItem,
} from 'vant';

export default {
  name: 'mine',
  data() {
    return {
      active: 1,
      gender: 1,
      nickName: '',
      userPhone: '',
      avatar: '',
      showPopover: false,
      actions: [
        { index: 0, text: '修改账号信息', icon: 'edit' },
        { index: 1, text: '添加收获地址', icon: 'add-o' },
        { index: 2, text: '111' },
      ],
      // 当前展开
      activeNames: [],
    };
  },
  components: {
    Tabbar, TabbarItem, Popover, Collapse, CollapseItem,
  },
  computed: {
    getUserGender() {
      const imgSrc = Number(this.gender) === 1 ? require('@/assets/imgs/man.png') : require('@/assets/imgs/woman.png');
      return imgSrc;
    },
  },
  methods: {
    // 头像预览
    previewImage() {
      ImagePreview([
        this.avatar,
      ]);
    },
    onSelect(action) {
      if (action.index === 0) {
        console.log(0);
      } else if (action.index === 1) {
        this.$router.push('/addAddress');
      } else if (action.index === 2) {
        console.log(2);
      }
    },
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.avatar = userInfo.avatar;
    this.nickName = userInfo.nickName;
    this.userPhone = userInfo.userPhone;
    this.gender = userInfo.gender;
  },
};
</script>
<style lang="less" scoped>
#mine {
  width: 100%;
  height: 100%;
  background-color: @gray-bgc;
  > .header {
    position: relative;
    height: 250px;
    background-color: @theme-color;
    border-radius: 0 0 150px 80px;
    > .pop {
      position: absolute;
      right: 20px;
      top: 20px;
      > .set {
        width: 40px;
        height: 40px;
      }
    }
    > .userInfo {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 80px;
      // background-color: #ccc;
      transform: translateY(40%);
      > .avatar-wrap {
        position: relative;
        width: 80px;
        height: 80px;
        margin-left: 30px;
        border-radius: 50%;
        > .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        > .genderIcon {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 25px;
          height: 25px;
          transform: translate(-50%, 40%);
        }
      }
      > .user {
        margin-left: 20px;
        padding-top: 15px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > .username {
          color: #fff;
        }
      }
    }
  }
  > .handle-list {
    margin-top: 70px;
    .list-item {
      margin-bottom: 10px;
    }
  }
  /deep/ .van-tabbar--fixed {
    bottom: -3px;
  }
}
</style>
