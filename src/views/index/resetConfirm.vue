<template>
  <div id="writeInfo-box">
    <Field
      v-model="newPassword"
      type="password"
      label="新密码"
      placeholder="请输入新密码">
    </Field>
    <Field
      v-model="cnewPassword"
      type="password"
      label="确认密码"
      placeholder="请再次输入新密码">
    </Field>
    <div class="btn">
      <Button
      class="next"
      round type="primary"
      size="small"
      @click="next"
      :loading="btnLoading">
      下一步
    </Button>
    </div>
  </div>
</template>

<script>
import { Field, Button } from 'vant';
import { validatePassword } from '@/utils/validate';
import { resetPwd } from './api';

export default {
  name: 'resetConfirm',
  data() {
    return {
      username: '',
      active: 2,
      btnLoading: false,
      newPassword: '',
      cnewPassword: '',
    };
  },
  components: {
    Field, Button,
  },
  methods: {
    next() {
      if (this.newPassword !== this.cnewPassword) {
        this.$toast.fail('请检查您的密码');
        return;
      }
      if (!validatePassword(this.newPassword)) {
        this.$toast.fail('密码应由最少10位最多15位的字母数字或下划线组成');
        return;
      }
      console.log('验证通过');
      const params = {
        username: this.username,
        password: this.newPassword,
      };
      this.btnLoading = true;
      resetPwd(params).then((res) => {
        if (res.status === 200) {
          this.$toast.loading({
            message: '加载中',
            forbidClick: true,
          });
          const resetPassword = JSON.parse(sessionStorage.getItem('resetPassword'));
          resetPassword.hasReset = true;
          sessionStorage.setItem('resetPassword', JSON.stringify(resetPassword));
          setTimeout(() => {
            this.$toast.clear();
            this.$router.push({
              path: '/reset/resetSuccess',
            });
          }, 2000);
        }
      }).finally(() => {
        this.btnLoading = false;
      });
    },
  },
  created() {
    const resetPassword = JSON.parse(sessionStorage.getItem('resetPassword'));
    if (!resetPassword || !resetPassword.hasChecked) {
      this.$router.push({
        path: '/reset',
      });
    }
    this.$emit('updateActive', this.active);
    this.username = this.$route.query.username;
  },
};
</script>
<style lang="less" scoped>
#writeInfo-box {
  font-family: '楷体';
  padding: 0 20px;
  > .btn {
    margin-top: 20px;
    text-align: center;
    > .next {
      width: 25%;
    }
  }
}
</style>
