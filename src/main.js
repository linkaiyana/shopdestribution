import Vue from 'vue';

import { Toast } from 'vant';

import App from './App.vue';
import router from './router';
import store from './store';

import './lib/rem';

Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
