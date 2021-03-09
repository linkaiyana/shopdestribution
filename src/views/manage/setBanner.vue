<template>
  <div class="set-banner">
    <m-nav-bar title="设置轮播图" bg="#b9ebff" fixed :isShowLeft="true" @clickLeft="$router.go(-1)"></m-nav-bar>
    <div class="content">
      <div class="item" v-for="(item, index) in banners" :key="item.id">
        <div class="top">
          <div class="preview">
            <img :src="$serveUrl + item.imgUrl" alt="">
          </div>
          <img class="toIcon" src="~assets/imgs/change.png" alt="">
          <m-upload ref="mupload" size="large" :multiple="false" :i="index" :list="item.newList" :num="1"></m-upload>
        </div>
        <van-field v-model="item.toId" label="跳转商品id" placeholder="请输入商品id"></van-field>
        <div class="btn">
          <van-button class="modify" size="small" type="info" @click="updateMsg(item,index)">确认修改</van-button>
          <van-button size="small" type="info" @click="deleteMsg(item,index)">删除图片</van-button>
        </div>
      </div>
      <van-button class="add-btn" size="small" type="info" v-if="banners.length < 6" @click="showAdd = true">新增一张</van-button>
      <div class="addDom" v-if="showAdd">
        <div class="left">
          <m-upload :i="100" :list="newImage" :multiple="false" :num="1"></m-upload>
          <van-field v-model="newToId" label="跳转商品id" placeholder="请输入id"></van-field>
        </div>
        <div class="right">
          <van-button size="small" type="info" @click="addBanner">确认新增</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mNavBar from 'components/mNavBar.vue';
import mUpload from 'components/mUpload/index.vue';
import { Field, Button } from 'vant';

import {
  updateBannerToId, updateBanner, deleteBanner, addBanner,
} from 'api/manage';
import { getBanner } from 'api/home';

export default {
  name: 'setBanner',
  data() {
    return {
      banners: [],
      showAdd: false,
      newImage: [],
      newToId: null,
    };
  },
  components: {
    mNavBar,
    mUpload,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    updateMsg(msg, index) {
      console.log(msg, index);
      if (msg.newList.length <= 0) {
        const data = {
          toId: msg.toId,
          id: msg.id,
        };
        updateBannerToId(data).then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
          }
        });
      } else {
        const data = msg.newList[0];
        data.append('data', JSON.stringify({
          toId: msg.toId,
          id: msg.id,
        }));
        updateBanner(data).then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
            msg.imgUrl = res.data;
            msg.newList = [];
            this.$refs.mupload[0].base64List = [];
            this.$refs.mupload[0].imgsList = [];
          }
        });
      }
    },
    deleteMsg(msg, index) {
      deleteBanner({ id: msg.id }).then((res) => {
        if (res.status === 200) {
          this.$toast.success(res.msg);
          this.banners.splice(index, 1);
        }
      });
    },
    getBanner() {
      getBanner().then((res) => {
        this.banners = res.data;
        this.banners.forEach((item) => {
          this.$set(item, 'newList', []);
        });
      });
    },
    addBanner() {
      if (this.newImage.length <= 0) {
        this.$toast.fail('请选择商品图片');
      }
      if (!this.newToId) {
        this.$toast.fail('请填写商品跳转id');
      }
      const data = this.newImage[0];
      data.append('data', JSON.stringify({
        toId: this.newToId,
      }));
      addBanner(data).then((res) => {
        if (res.status === 200) {
          this.$toast.success('添加成功');
          this.showAdd = false;
          this.getBanner();
        }
      });
    },
  },
  created() {
    // 获取轮播图
    this.getBanner();
  },
};
</script>
<style lang="less" scoped>
.set-banner {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #e1e3fa 0%, #faf9f9 100%);
  /deep/ .van-field {
    background: transparent;
  }
  > .content {
    padding: 20px;
    > .item {
      padding: 10px 0;
      > .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .preview {
          display: flex;
          align-items: center;
          width: 100px;
          height: 100px;
          > img {
            width: 100%;
          }
        }
        > .toIcon {
          width: 50px;
        }
      }
      > .btn {
        text-align: center;
        > .modify {
          margin-right: 20px;
        }
      }
    }
    > .add-btn {
      margin: 10px 0 20px;
    }
    > .addDom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .left {
        width: 200px;
      }
    }
  }
}
</style>
