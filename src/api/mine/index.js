import axiosIns from 'utils/axios';

// 添加新地址
export function addNewAddress(data) {
  return axiosIns({
    url: '/info/addAddress',
    method: 'post',
    data,
  });
}

// 根据账号获取地址
export function getAddressByUserPhone(data) {
  return axiosIns({
    url: '/info/getAddress',
    method: 'post',
    data,
  });
}

// 根据id获取地址
export function getAddressById(data) {
  return axiosIns({
    url: '/info/findAddressById',
    method: 'post',
    data,
  });
}

// 根据id删除地址
export function delAddressById(data) {
  return axiosIns({
    url: '/info/delAddressById',
    method: 'post',
    data,
  });
}

// 根据id更新地址
export function updateAddressById(data) {
  return axiosIns({
    url: '/info/upadateAddress',
    method: 'post',
    data,
  });
}

// 根据账号获取收藏品
export function getCollection(data) {
  return axiosIns({
    url: '/info/getCollection',
    method: 'post',
    data,
  });
}

// 获取所有订单
export function getAllOrder(data) {
  return axiosIns({
    url: '/info/getAllOrder',
    method: 'post',
    data,
  });
}

// 获取所有待发货订单
export function getAllUnDeliveredOrder(data) {
  return axiosIns({
    url: '/info/getAllUnDeliveredOrder',
    method: 'post',
    data,
  });
}

// 获取所有已发货订单
export function getAllDeliveredOrder(data) {
  return axiosIns({
    url: '/info/getAllDeliveredOrder',
    method: 'post',
    data,
  });
}

// 获取所有已送达订单
export function getAllArrivedOrder(data) {
  return axiosIns({
    url: '/info/getAllArrivedOrder',
    method: 'post',
    data,
  });
}

// 获取所有已完成订单
export function getAllCompleteOrder(data) {
  return axiosIns({
    url: '/info/getAllCompleteOrder',
    method: 'post',
    data,
  });
}
