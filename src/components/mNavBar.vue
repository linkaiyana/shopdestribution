<template>
  <div>
    <van-nav-bar
      :fixed="fixed"
      :placeholder="placeholder"
      :title="title"
      :class="{bg: typeof bg !== 'string' && bg}"
      z-index="999"
      :style="{background: typeof bg === 'string' ? bg : ''}"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #left>
        <slot name="leftIcon" v-if="isShowLeft">
          <van-icon name="arrow-left" size="22" />
        </slot>
      </template>
      <template #right v-if="isShowRight">
        <slot name="rightIcon">
          <van-icon name="search" size="22" />
        </slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant';

export default {
  name: 'mNavBar',
  props: {
    title: {
      type: String,
      default: '主页',
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: Boolean,
      default: true,
    },
    isShowLeft: {
      type: Boolean,
      default: false,
    },
    isShowRight: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: [Boolean, String],
      default: false,
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  methods: {
    onClickLeft() {
      this.$emit('clickLeft');
    },
    onClickRight() {
      this.$emit('clickRight');
    },
  },
};
</script>
<style lang="less" scoped>
.bg {
  /deep/ .van-nav-bar {
    background: @theme-color!important;
  }
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
    font-weight: 700;
  }
}
/deep/ .van-nav-bar {
  background: #b9ebff;
}
</style>
