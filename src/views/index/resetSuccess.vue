<template>
  <div id="writeInfo-box">
    <h2 class="title">
      恭喜您!!
      <br/>
      密码重置成功，请保管好您的密码
    </h2>
    <div class="btn">
      <Button
      class="next"
      round
      type="info"
      size="small"
      @click="next"
      :loading="btnLoading">
      完成
    </Button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'resetSuccess',
  data() {
    return {
      active: 3,
      btnLoading: false,
    };
  },
  components: {
    Button,
  },
  methods: {
    next() {
      this.btnLoading = true;
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
      });
      sessionStorage.removeItem('resetPassword');
      setTimeout(() => {
        this.btnLoading = false;
        this.$toast.clear();
        this.$router.replace({
          path: '/login',
        });
      }, 2000);
    },
  },
  created() {
    const resetPassword = JSON.parse(sessionStorage.getItem('resetPassword'));
    if (!resetPassword || !resetPassword.hasReset) {
      this.$router.push({
        path: '/reset',
      });
    }
    this.$emit('updateActive', this.active);
  },
};
</script>
<style lang="less" scoped>
#writeInfo-box {
  font-family: '楷体';
  padding: 0 20px;
  > .title {
    text-align: center;
    font-weight: 100;
    font-size: 18px;
    margin-top: 20px;
    line-height: 30px;
  }
  > .btn {
    margin-top: 20px;
    text-align: center;
    > .next {
      width: 25%;
    }
  }
}
</style>
