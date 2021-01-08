import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('@/views/login/index.vue');
const Register = () => import('@/views/register/index.vue');
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
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
