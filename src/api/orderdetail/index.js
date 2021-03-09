import axiosIns from 'utils/axios';

// 根据订单基本信息
export function getOrderBase(data) {
  return axiosIns({
    url: '/info/getOrderBase',
    method: 'post',
    data,
  });
}
// 根据订单商品信息
export function getOrderGoods(data) {
  return axiosIns({
    url: '/info/getOrderGoods',
    method: 'post',
    data,
  });
}

// 完成订单
export function completeOrder(data) {
  return axiosIns({
    url: '/completeOrder',
    method: 'post',
    data,
  });
}

// 删除订单
export function delOrder(data) {
  return axiosIns({
    url: '/delOrder',
    method: 'post',
    data,
  });
}
