<template>
  <div id="writeInfo-box">
    <Field
      v-model="back.username"
      label="用户名"
      placeholder="请输入要找回的账号">
    </Field>
    <Field
      v-model="back.email"
      label="邮箱"
      placeholder="请输入账号绑定的邮箱">
    </Field>
    <Button
      class="next"
      round
      type="info"
      size="small"
      @click="next"
      :loading="btnLoading">
      下一步
    </Button>
  </div>
</template>

<script>
import { Field, Button } from 'vant';
import { hasUser } from './api';

export default {
  name: 'writeInfo',
  data() {
    return {
      back: {
        username: '',
        email: '',
      },
      active: 0,
      btnLoading: false,
    };
  },
  components: {
    Field, Button,
  },
  methods: {
    next() {
      if (!this.back.username || !this.back.email) {
        this.$toast.fail('请填写用户名和邮箱');
        return;
      }
      const params = {
        username: this.back.username,
        email: this.back.email,
      };
      hasUser(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          sessionStorage.setItem('resetPassword', JSON.stringify({
            hasWriteInfo: true,
          }));
          this.$router.push({
            path: '/reset/check',
            query: {
              username: this.back.username,
            },
          });
        }
      }).finally(() => {
        this.btnLoading = false;
      });
    },
  },
  created() {
    this.$emit('updateActive', this.active);
  },
};
</script>
<style lang="less" scoped>
#writeInfo-box {
  font-family: '楷体';
  text-align: center;
  > .next {
    width: 25%;
    margin-top: 20px;
  }
}
</style>
