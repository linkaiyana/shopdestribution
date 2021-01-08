<template>
  <div id="login-box">
    <div class="title">
      诚悦商店
    </div>
    <div class="msg">
      <Form>
        <Field v-model="userForm.username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名" />
        <Field v-model="userForm.username"
          name="密码"
          label="密码"
          placeholder="请输入密码" />
      </Form>
      <Button class="login-btn"
              :loading="loading"
              loading-type="spinner"
              loading-text="登录中..."
              block round type="info">登录</Button>
    </div>
    <div class="register" @click="toRegister">
      没有账号？立即注册
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from 'vant';

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      userForm: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    Form,
    Field,
    Button,
  },
  methods: {
    toRegister() {
      this.$router.push('/register');
    },
  },
};
</script>
<style lang="less" scoped>
#login-box {
  margin-top: 70px;
  > .title {
    color: blue;
    margin: 30px 0;
    font-size: 40px;
    font-weight: 700;
    font-style: italic;
    font-family: 华文行楷;
    text-align: center;
  }
  > .msg {
    width: 100%;
    font-size: 20px;

    > .login-btn {
      width: 80%;
      margin: 20px auto 0;
      // letter-spacing: 2rem;
      // text-indent: 2rem;
    }
  }
  > .register {
    color: blue;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
}

</style>
