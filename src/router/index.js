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
const Home = () => import('@/views/home/home.vue');
const ShopCart = () => import('@/views/shopCart/shopCart.vue');
const Mine = () => import('@/views/mine/mine.vue');
const AddAddress = () => import('@/views/mine/addAddress.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/reset',
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
    name: 'setSafe',
    component: SetSafe,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: ShopCart,
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress,
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('userInfo');
  // 登录页面直接跳转
  if (to.path.indexOf('/login') !== -1 || to.path.indexOf('/reset') !== -1 || to.path.indexOf('/register') !== -1) {
    next();
  } else if (userInfo) { // 不是登录页面，判断是否登录过
    next();
  } else {
    next({
      path: '/login',
    });
  }
});

export default router;
