<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// // 自定义info按钮颜色
// .van-button--info {
//   background-color: @theme-color !important;
//   border: 0.0625rem solid @theme-color !important;
// }

// 自定义渐变色按钮颜色
.linear-btn {
  color: white !important;
  background: linear-gradient(to right, rgb(218, 216, 216), @theme-color) !important;
  border: 0px !important;
}

// // 自定义单选按钮颜色
// .van-radio__icon--checked .van-icon{
//   border-color: @theme-color !important;
//   background-color: @theme-color !important;
// }

// // 自定义checkbox颜色
// .van-checkbox__icon--checked .van-icon {
//   background-color: @theme-color !important;
// }
</style>
