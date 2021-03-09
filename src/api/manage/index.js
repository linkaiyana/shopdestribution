import axiosIns from 'utils/axios';

// 设置配送地址
export function setShippingAddress(data) {
  return axiosIns({
    url: '/mange/setShippingAddress',
    method: 'post',
    data,
  });
}

// 设置banner跳转id
export function updateBannerToId(data) {
  return axiosIns({
    url: '/manage/updateBannerToId',
    method: 'post',
    data,
  });
}

// 设置banner图片和id
export function updateBanner(data) {
  return axiosIns({
    url: '/manage/updateBanner',
    method: 'post',
    data,
  });
}

// 添加新banner
export function addBanner(data) {
  return axiosIns({
    url: '/manage/addBanner',
    method: 'post',
    data,
  });
}

// 删除banner
export function deleteBanner(data) {
  return axiosIns({
    url: '/manage/deleteBanner',
    method: 'post',
    data,
  });
}

// 获取商品分类
export function getGoodsCategory() {
  return axiosIns({
    url: '/info/getGoodsCategory',
    method: 'get',
  });
}

// 添加商品
export function addGoods(data) {
  return axiosIns({
    url: '/manage/addGoods',
    method: 'post',
    data,
  });
}

// 获取所有商品信息
export function getAllGoods() {
  return axiosIns({
    url: '/info/getAllGoods',
    method: 'post',
  });
}

// 根据id获取商品信息
export function getBaseById(data) {
  return axiosIns({
    url: '/info/getBaseById',
    method: 'post',
    data,
  });
}

// 根据商品名称获取商品信息
export function getBaseByName(data) {
  return axiosIns({
    url: '/info/getBaseByName',
    method: 'post',
    data,
  });
}

// 更新商品信息
export function updateGoodsById(data) {
  return axiosIns({
    url: '/manage/updateGoodsById',
    method: 'post',
    data,
  });
}

// 删除商品
export function delGoodsById(data) {
  return axiosIns({
    url: '/manage/delGoodsById',
    method: 'post',
    data,
  });
}

// 获取热卖商品
export function getHotBase() {
  return axiosIns({
    url: '/info/getHotBase',
    method: 'post',
  });
}

// 修改热卖状态
export function changeHotState(data) {
  return axiosIns({
    url: '/manage/changeHotState',
    method: 'post',
    data,
  });
}
