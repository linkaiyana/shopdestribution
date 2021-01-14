<template>
  <div id="writeInfo-box">
    <div class="problem">
      1. {{problemA}}
    </div>
    <Field
      v-model="answerA"
      label="答案"
      placeholder="请输入答案">
    </Field>
    <div class="problem">
      2. {{problemB}}
    </div>
    <Field
      v-model="answerB"
      label="答案"
      placeholder="请输入答案">
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
import { getProb, verifyAnswer } from './api';

export default {
  name: 'check',
  data() {
    return {
      username: '',
      problemA: '',
      problemB: '',
      answerA: '',
      answerB: '',
      active: 1,
      btnLoading: false,
    };
  },
  components: {
    Field, Button,
  },
  methods: {
    next() {
      if (!this.answerA || !this.answerB) {
        this.$toast.fail('请输入答案');
        return;
      }
      const params = {
        username: this.username,
        answerA: this.answerA,
        answerB: this.answerB,
      };
      this.btnLoading = true;
      verifyAnswer(params).then((res) => {
        if (res.status === 200) {
          const resetPassword = JSON.parse(sessionStorage.getItem('resetPassword'));
          resetPassword.hasChecked = true;
          sessionStorage.setItem('resetPassword', JSON.stringify(resetPassword));
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.push({
              path: '/reset/resetConfirm',
              query: {
                username: this.username,
              },
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
    if (!resetPassword || !resetPassword.hasWriteInfo) {
      this.$router.push({
        path: '/reset',
      });
    }
    this.$emit('updateActive', this.active);
    this.username = this.$route.query.username;
    const params = {
      username: this.username,
    };
    getProb(params).then((res) => {
      this.problemA = res.problemA;
      this.problemB = res.problemB;
    });
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
