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
const Detail = () => import('@/views/home/detail.vue');

const ShopCart = () => import('@/views/shopCart/shopCart.vue');

const Mine = () => import('@/views/mine/mine.vue');

const SetAddress = () => import('@/views/mine/setAddress.vue');
const Manage = () => import('@/views/manage/manage.vue');
const AddressEdit = () => import('@/views/manage/addressEdit.vue');
const AddGoods = () => import('@/views/manage/addGoods.vue');
const SetGoods = () => import('@/views/manage/setGoods.vue');
const SetBanner = () => import('@/views/manage/setBanner.vue');
const SetHot = () => import('@/views/manage/setHot.vue');
const SetOrders = () => import('@/views/manage/setOrders.vue');

const PayMent = () => import('@/views/payment/payment.vue');
const OrderDetail = () => import('@/views/orderDetail/orderDetail.vue');

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
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    component: AddressEdit,
  },
  {
    path: '/addGoods',
    name: 'addGoods',
    component: AddGoods,
  },
  {
    path: '/setGoods',
    name: 'setGoods',
    component: SetGoods,
  },
  {
    path: '/setBanner',
    name: 'setBanner',
    component: SetBanner,
  },
  {
    path: '/setHot',
    name: 'setHot',
    component: SetHot,
  },
  {
    path: '/setOrders',
    name: 'setOrders',
    component: SetOrders,
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
    path: '/setAddress',
    name: 'setAddress',
    component: SetAddress,
  },
  {
    path: '/payment',
    name: 'payment',
    component: PayMent,
  },
  {
    path: '/order-detail',
    name: 'orderDetail',
    component: OrderDetail,
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
