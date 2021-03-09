<template>
  <div id="setSafe-box">
    <h3 class="title">安全中心</h3>
    <p>您的账号很不安全，请设置两个安全问题用于找回密码（问题以“？”结尾）：</p>
    <br>
    <div class="msg">
      <Field
        v-model="safe.problemA"
        name="problemA"
        type="text"
        label="问题"
        placeholder="请输入第一个问题">
      </Field>
      <Field
        v-model="safe.answerA"
        name="answerA"
        type="text"
        label="答案"
        placeholder="请输入答案">
      </Field>
      <Field
        v-model="safe.problemB"
        name="problemB"
        type="text"
        label="问题"
        placeholder="请输入第一个问题">
      </Field>
      <Field
        v-model="safe.answerB"
        name="answerB"
        type="text"
        label="答案"
        placeholder="请输入答案">
      </Field>
    </div>
    <div class="submit">
      <Button
        class="set-btn"
        :loading="btnLoading"
        loading-type="spinner"
        loading-text="正在提交..."
        block round type="info"
        @click="setSafe">
        提交
      </Button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Dialog } from 'vant';
import { setSafe } from 'api/index';

export default {
  name: 'setSafe',
  data() {
    return {
      safe: {
        problemA: '',
        answerA: '',
        problemB: '',
        answerB: '',
      },
      btnLoading: false,
    };
  },
  components: {
    Field, Button,
  },
  created() {
  },
  methods: {
    setSafe() {
      if (!this.safe.problemA || !this.safe.problemB) {
        this.$toast.fail('请输入您的问题');
        return;
      }
      const reg = /(.+)[?？]$/g;
      if (!(reg.test(this.safe.problemA) && this.safe.problemB)) {
        this.$toast.fail('问题必须已？结尾');
        return;
      }
      if (!this.safe.answerA || !this.safe.answerB) {
        this.$toast.fail('请输入您的答案');
        return;
      }
      this.btnLoading = true;
      Dialog.alert({
        title: '提示',
        message: '问题设置后无法修改，确认提交吗？',
        showCancelButton: true,
      }).then(() => {
        // 确认
        const params = {
          uid: JSON.parse(localStorage.getItem('userInfo')).id,
          problemA: this.safe.problemA,
          answerA: this.safe.answerA,
          problemB: this.safe.problemB,
          answerB: this.safe.answerB,
        };
        setSafe(params).then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
            setTimeout(() => {
              this.$router.push('/home');
            }, 2000);
          }
        });
      }).catch(() => {
        // 取消
        console.log('取消');
      }).finally(() => {
        this.btnLoading = false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
#setSafe-box {
  width: 100%;
  height: 100%;
  font-family: 楷体;
  padding: 60px 20px;
  > .title {
    font-size: 20px;
    margin-bottom: 24px;
  }
  // > .msg {
  //   margin-top: 24px;
  // }
  > .submit {
    margin-top: 20px;
    > Button {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
