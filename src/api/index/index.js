import axiosIns from 'utils/axios';

// 登录
export function login(data) {
  return axiosIns({
    url: '/login',
    method: 'post',
    data,
  });
}

// 注册
export function register(data) {
  return axiosIns({
    url: '/register',
    method: 'post',
    data,
  });
}

// 设置安全信息
export function setSafe(data) {
  return axiosIns({
    url: '/userSafe/setSafe',
    method: 'post',
    data,
  });
}

// 查找账号
export function hasUser(params) {
  return axiosIns({
    url: '/userSafe/hasUser',
    method: 'get',
    params,
  });
}

// 查看账号安全问题
export function getProb(params) {
  return axiosIns({
    url: '/userSafe/getProb',
    method: 'get',
    params,
  });
}

// 验证答案
export function verifyAnswer(data) {
  return axiosIns({
    url: '/userSafe/verifyAnswer',
    method: 'post',
    data,
  });
}

// 重置密码
export function resetPwd(data) {
  return axiosIns({
    url: '/userSafe/reset',
    method: 'post',
    data,
  });
}
