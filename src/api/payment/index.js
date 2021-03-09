import axiosIns from 'utils/axios';

// 根据账号获取默认地址
export function getDefaultAddress(data) {
  return axiosIns({
    url: '/info/getDefaultAddress',
    method: 'post',
    data,
  });
}

// 根据账号获取默认地址
export function getGoodsByIds(data) {
  return axiosIns({
    url: '/info/getGoodsByIds',
    method: 'post',
    data,
  });
}

// 添加到订单
export function addToOrder(data) {
  return axiosIns({
    url: '/addToOrder',
    method: 'post',
    data,
  });
}
