import axiosIns from 'utils/axios';

export function UploadFile(data) {
  return axiosIns({
    url: '/upload',
    method: 'post',
    data,
  });
}

// 获取轮播图数据
export function getBanner() {
  return axiosIns({
    url: '/info/banner',
    method: 'post',
  });
}

// 获取今日热卖数据
export function getHot() {
  return axiosIns({
    url: '/info/hot',
    method: 'post',
  });
}

// 获取今日热卖数据
export function getGoodsByTag(tagId) {
  return axiosIns({
    url: '/info/getGoodsByTag',
    method: 'post',
    data: {
      tagId,
    },
  });
}

// 获取商品详情
export function getGoodsById(id) {
  return axiosIns({
    url: '/info/getGoodsById',
    method: 'post',
    data: {
      id,
    },
  });
}
