<template>
  <div>
    <NavBar
      :fixed="fixed"
      :placeholder="placeholder"
      :title="title"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #left>
        <slot name="leftIcon">
          <Icon name="search" size="22" />
        </slot>
      </template>
      <template #right>
        <slot name="rightIcon">
          <Icon name="search" size="22" />
        </slot>
      </template>
    </NavBar>
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
      default: false,
    },
  },
  components: {
    NavBar, Icon,
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
