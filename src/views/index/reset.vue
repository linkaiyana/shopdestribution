<template>
  <div id="reset-box">
    <h2 class="title">重置密码</h2>
    <Steps class="steps" :active="active">
      <Step>填写信息</Step>
      <Step>验证账号</Step>
      <Step>重置密码</Step>
      <Step>重置成功</Step>
    </Steps>
    <router-view @updateActive='updateActive'></router-view>
  </div>
</template>

<script>
import { Steps, Step } from 'vant';

export default {
  name: 'reset',
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Steps, Step,
  },
  methods: {
    updateActive(active) {
      this.active = active;
    },
  },
};
</script>
<style lang="less" scoped>
#reset-box {
  font-family: 楷体;
  padding: 60px 20px;
  > .title {
    font-size: 20px;
    font-weight: 100;
    margin-bottom: 10px;
  }
  > .steps {
    margin-bottom: 20px;
  }
}
</style>
