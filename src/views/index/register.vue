<template>
  <div id="register-box">
    <h2 class="title">手机号注册</h2>
    <van-form class="register-form">
      <div class="wrap">
        <van-field
          name="nickName"
          v-model="userInfo.nickName"
          placeholder="输入您的昵称"
          :rules="[{ required: true }]"
          label="昵称"
        >
        </van-field>
        <m-upload size="small" :multiple="false" :list="fileList" :num="1"></m-upload>
        <!-- <Uploader
          class="upload"
          v-model="fileList"
          preview-size="70px"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="1"/> -->
      </div>
      <van-field
        name="email"
        v-model="userInfo.email"
        placeholder="请填写邮箱地址"
        label="邮箱"
        :rules="[{ required: true }]">
      </van-field>
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userInfo.gender" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="phone"
        label="手机号码"
        v-model="userInfo.phoneNumber"
        :maxlength="11"
        placeholder="请填写手机号码"
        :rules="[{ required: true }]">
      </van-field>
      <van-field
        name="password"
        label="密码"
        type="password"
        v-model="userInfo.password"
        placeholder="请填写密码"
        :rules="[{ required: true }]">
      </van-field>
      <van-field
        name="confirmPwd"
        label="确认密码"
        type="password"
        v-model="userInfo.cpassword"
        placeholder="请再次输入密码"
        :rules="[{ required: true }]">
      </van-field>
    </van-form>
    <div class="check-wrap">
      <van-checkbox
        class="checkbox"
        v-model="checked"
        icon-size="15px"
        shape="square">
      </van-checkbox>
      <span>我已阅读并同意</span>
      <span @click="showAgreement">《用户协议》</span>
    </div>

    <div class="btns">
      <van-button class="linear-btn" :loading="btnLoading" @click="register">
        注册
      </van-button>
      <van-button
        color="linear-gradient(to right, #bdc2c2, #979899)"
        @click="reset">
        重置
      </van-button>
    </div>

    <!-- 弹出层 -->
    <van-popup
      class="model"
      v-model="isAgreementShow"
      round
      closeable
      position="bottom"
      :style="{ height: '70%' }">
      <div v-html="message"></div>
    </van-popup>
  </div>
</template>

<script>
import {
  // Uploader,
  Form,
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  Popup,
  Button,
} from 'vant';
import mUpload from 'components/mUpload/index.vue';
import { register } from 'api/index';
import {
  validatePhone,
  validateEmail,
  validatePassword,
} from '../../utils/validate';

export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        nickName: '',
        email: '',
        phoneNumber: '',
        gender: '1',
        password: '',
        cpassword: '',
      },
      checked: false,
      fileList: [],
      isAgreementShow: false,
      message: `<p>
            本协议是由诚悦公司(以下简称我公司)与用户(指注册、登录、使用本服务的个人，吓有时称为“您”)就xxX以下简称“本产品”)提供的服务所可立的相关权利义务规范。
          </p>
          <p>一、总则</p>
          <p>
            1.用户在注册及使用前请认真阅读本协议，确保充分理解本协议中所有条款。除非您接受本协议所有条款，香则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为无条件接受本协议所有条款的约束。
          </p>
          <p>
            2、除非另有明确规定，本产品所推出的新功能、新服务，均无条件的使用本协议。
          </p>
          <p>
            3、我公司保留在任何时候修改本协议条款的权利，且无须先行通知。在我公司修改协议条款后，如果您不接受修改后的条款，请立即停止使用本本文档所提供的信息。
          </p>`,
      btnLoading: false,
    };
  },
  components: {
    // Uploader,
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [Popup.name]: Popup,
    [Button.name]: Button,
    mUpload,
  },
  methods: {
    beforeRead(e) {
      const imgSize = e.size;
      const fileType = e.type;
      console.log(fileType);
      if (fileType.indexOf('image') === -1) {
        this.$toast.fail('请上传图片文件');
        return false;
      }
      if (imgSize / (1024 * 1024) >= 2) {
        this.$toast.fail('图片大小应小于2M');
        return false;
      }
      return true;
    },
    // 上传图片
    afterRead(e) {
      console.log(e);
    },
    showAgreement() {
      this.isAgreementShow = true;
    },
    validForm() {
      // 校验数据合法性
      if (!validatePhone(this.userInfo.phoneNumber)) {
        this.$toast.fail('请输入合法的手机号码');
        return false;
      }
      if (!validateEmail(this.userInfo.email)) {
        this.$toast.fail('请检查您的邮箱信息');
        return false;
      }
      if (!validatePassword(this.userInfo.password)) {
        this.$toast.fail('密码应由最少10位最多15位的字母数字或下划线组成');
        return false;
      }
      return true;
    },
    // 注册
    register() {
      // 校验数据
      if (
        !this.userInfo.nickName
        || !this.userInfo.email
        || !this.userInfo.password
        || !this.userInfo.cpassword
      ) {
        this.$toast.fail('请填写所有必填信息');
        return;
      }
      if (
        !this.fileList
        || this.fileList === []
        || this.fileList.length === 0
      ) {
        this.$toast.fail('请上传您的头像');
        return;
      }
      if (!this.checked) {
        this.$toast.fail('请阅读并勾选用户协议');
        return;
      }
      if (this.userInfo.password !== this.userInfo.cpassword) {
        this.$toast.fail('两次输入的密码不一致');
        return;
      }
      // 校验数据合法性
      if (!this.validForm()) {
        return;
      }
      // 发送请求
      this.btnLoading = true;
      const data = {
        userPhone: this.userInfo.phoneNumber,
        password: this.userInfo.password,
        nickName: this.userInfo.nickName,
        email: this.userInfo.email,
        gender: this.userInfo.gender,
      };
      this.fileList[0].append('data', JSON.stringify(data));
      register(this.fileList[0])
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(`${res.msg}，即将前往登录页面`);
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    // 重置
    reset() {
      this.userInfo = {
        nickName: '',
        email: '',
        phoneNumber: '',
        gender: '1',
        password: '',
        cpassword: '',
      };
    },
  },
};
</script>
<style lang="less" scoped>
#register-box {
  width: 100%;
  height: 100%;
  font-family: 楷体;
  padding: 60px 20px;
  > .title {
    font-size: 20px;
  }
  > .register-form {
    > .wrap {
      display: flex;
      align-items: flex-end;
      > .upload {
        margin-right: 20px;
      }
    }
  }
  > .check-wrap {
    display: flex;
    justify-content: center;
    font-size: 13px;
    margin-top: 10px;
    > .checkbox {
      border-radius: 5px;
      margin-right: 5px;
      /deep/.van-checkbox__icon {
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid #ccc;
        .van-icon {
          border: none;
        }
      }
    }
    > span:first-of-type {
      color: #ccc;
    }
    > span:last-of-type {
      color: @theme-color;
    }
  }
  > .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    > Button {
      width: 40%;
    }
  }
  > .model {
    padding: 20px 20px 0;
    overflow: auto;
    > div {
      font-size: 14px;
      color: #555;
      margin-top: 50px;
    }
  }
}
</style>
