<template>
  <div id="login-box">
    <div class="logo">
      诚悦商店
      <!-- <img src="@/assets/imgs/logo.png" /> -->
    </div>
    <div class="msg">
      <Form>
        <Field
          v-model="userForm.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名" />
        <Field
          v-model="userForm.password"
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码" />
        <div v-if="userForm.username.length === 11">
          <Field
          v-model="userForm.captcha"
          name="captcha"
          label="验证码"
          placeholder="输入验证码">
            <template #extra>
              <img @click="refreshCaptcha" ref="captcha" :src="'http://localhost:3000/userSafe/getCaptcha?username='+userForm.username" alt="验证码">
            </template>
          </Field>
        </div>
      </Form>
      <Button
        class="login-btn"
        :loading="btnLoading"
        loading-type="spinner"
        loading-text="登录中..."
        block
        round
        type="info"
        @click="login">
        登录
      </Button>
    </div>
    <div class="operation">
      <div class="reset" @click="toResetPassword">
        忘了密码？
      </div>
      <div class="register" @click="toRegister">
      没有账号？立即注册
      </div>
    </div>
  </div>
</template>

<script>

import { Form, Field, Button } from 'vant';
import { login } from './api';

export default {
  name: 'login',
  data() {
    return {
      btnLoading: false,
      userForm: {
        username: '',
        password: '',
        captcha: '',
      },
    };
  },
  components: {
    Form,
    Field,
    Button,
  },
  methods: {
    login() {
      if (!this.userForm.username) {
        this.$toast.fail('请输入用户名');
        return;
      }
      if (!this.userForm.password) {
        this.$toast.fail('请输入密码');
        return;
      }
      const params = {
        username: this.userForm.username,
        password: this.userForm.password,
        captcha: this.userForm.captcha,
      };
      this.btnLoading = true;
      login(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // 存储用户信息
          localStorage.setItem('userInfo', JSON.stringify(res.user));
          // 存储token
          localStorage.setItem('token', res.token);
          this.$toast.success('登录成功');
          if (Number(res.user.isSafe) === 0) {
            setTimeout(() => {
              this.$router.push('/setSafe');
            }, 2000);
          } else {
            setTimeout(() => {
              this.$router.push('/home');
            }, 2000);
          }
        } else {
          this.$refs.captcha.src = `http://localhost:3000/userSafe/getCaptcha?username=${this.userForm.username}&randomNum=${Math.random()}`;
        }
      }).finally(() => {
        this.btnLoading = false;
      });
    },
    toRegister() {
      this.$router.push('/register');
    },
    // 重置密码
    toResetPassword() {
      this.$router.push('/reset');
    },
    // 刷新验证码
    refreshCaptcha() {
      this.$refs.captcha.src = `http://localhost:3000/userSafe/getCaptcha?username=${this.userForm.username}&randomNum=${Math.random()}`;
    },
  },
};
</script>
<style lang="less" scoped>
#login-box {
  width: 100%;
  height: 100%;
  padding-top: 70px;
  > .logo {
    font-size: 45px;
    color: @theme-color;
    font-family: '华文行楷';
    font-style: italic;
    margin: 10px;
    text-align: center;
    > img {
      width: 200px;
    }
  }
  > .msg {
    width: 100%;
    font-size: 20px;
    padding: 0 20px;
    > .login-btn {
      width: 80%;
      margin: 20px auto 0;
    }
  }
  > .operation {
    display: flex;
    justify-content: space-between;
    width: 80%;
    color: @theme-color;
    font-size: 12px;
    margin: 15px auto;
  }
}

</style>
