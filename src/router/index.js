import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('@/views/index/login.vue');
const Register = () => import('@/views/index/register.vue');
const Reset = () => import('@/views/index/reset.vue');
const WriteInfo = () => import('@/views/index/writeInfo.vue');
const Check = () => import('@/views/index/check.vue');
const ResetConfirm = () => import('@/views/index/resetConfirm.vue');
const ResetSuccess = () => import('@/views/index/resetSuccess.vue');

const SetSafe = () => import('@/views/index/setSafe.vue');
const Home = () => import('@/views/home/index.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    children: [
      { path: '', redirect: 'writeInfo' },
      { path: 'writeInfo', component: WriteInfo },
      { path: 'check', component: Check },
      { path: 'resetConfirm', component: ResetConfirm },
      { path: 'resetSuccess', component: ResetSuccess },
    ],
  },
  {
    path: '/setSafe',
    name: 'SetSafe',
    component: SetSafe,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userInfo = localStorage.getItem('userInfo');
//   // 登录页面直接跳转
//   if (to.path.indexOf('/login') !== -1) {
//     if (userInfo) {
//       next({
//         path: '/home',
//       });
//     } else {
//       next();
//     }
//     next();
//   } else if (userInfo) { // 不是登录页面，判断是否登录过
//     next();
//   } else {
//     next({
//       path: '/login',
//     });
//   }
// });

export default router;
