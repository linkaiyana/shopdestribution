<template>
  <div id="register-box">
    <div class="title">手机号注册</div>
    <div class="wrap">
      <Field v-model="userInfo.nickName" placeholder="输入您的昵称" label="昵称"></Field>
      <Uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
    </div>
    <Field v-model="userInfo.email" placeholder="请填写邮箱地址" label="邮箱"></Field>
    <RadioGroup>
      <Radio></Radio>
    </RadioGroup>

  </div>
</template>

<script>
import {
  Uploader, Field, RadioGroup, Radio,
} from 'vant';

export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        nickName: '',
        email: '',
      },
      fileList: [],
    };
  },
  components: {
    Uploader, Field, RadioGroup, Radio,
  },
  methods: {
    afterRead() {
      console.log(123);
    },
  },
};
</script>
<style lang="less" scoped>
#register-box {
  .wrap {
    display: flex;
    align-items: flex-end;
  }
}
</style>
