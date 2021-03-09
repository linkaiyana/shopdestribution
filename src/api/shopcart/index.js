import axiosIns from 'utils/axios';

// 根据账号获取购物车信息
export function getShopCart(data) {
  return axiosIns({
    url: '/info/getShopCart',
    method: 'post',
    data,
  });
}

// 根据账号修改购物车信息
export function changeGoodsNum(data) {
  return axiosIns({
    url: '/changeGoodsNum',
    method: 'post',
    data,
  });
}

// 删除购物车商品
export function deleteFromCart(data) {
  return axiosIns({
    url: '/deleteFromCart',
    method: 'post',
    data,
  });
}
