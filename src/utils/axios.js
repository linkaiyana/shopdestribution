import axios from 'axios';
import { Toast } from 'vant';

const axiosIns = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  baseURL: 'http://192.168.1.21:3000',
});
const jwToken = 'jwToken';
// 请求拦截
axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers[jwToken] = token;
  } else {
    delete config.headers[jwToken];
  }
  return config;
});
// 响应拦截
axiosIns.interceptors.response.use((response) => {
  // lan
  const { status, msg } = response.data;
  if (status === 4000 || status === 3000) { // token已过期或token不存在
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    Toast({
      message: `${msg}即将返回登录页面`,
      type: 'fail',
      duration: 5000,
    });
    setTimeout(() => {
      window.location.replace(`${window.location.origin}#/login`);
    }, 5000);
  } else if (status === 1001) { // 查找不存在
    Toast({
      message: `${msg}`,
      type: 'fail',
      duration: 2000,
    });
  } else if (status === 1002) { // 操作失败，错误
    Toast({
      message: `${msg}`,
      type: 'fail',
      duration: 2000,
    });
  } else if (status === 1003) { // 已存在
    Toast({
      message: `${msg}`,
      type: 'fail',
      duration: 2000,
    });
  }
  return response.data;
});

export default axiosIns;
