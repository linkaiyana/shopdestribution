import Vue from 'vue';

import { Toast } from 'vant';

import App from './App.vue';
import router from './router';
import store from './store';
import axios from './utils/axios';

import './lib/rem';

axios.defaults.withCredentials = true;

Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
