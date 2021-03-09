import axiosIns from 'utils/axios';

export function collect(data) {
  return axiosIns({
    url: '/collect',
    method: 'post',
    data,
  });
}

export function collectStatus(data) {
  return axiosIns({
    url: '/collectStatus',
    method: 'post',
    data,
  });
}

export function cCollect(data) {
  return axiosIns({
    url: '/cancelCollect',
    method: 'post',
    data,
  });
}

export function addToCart(data) {
  return axiosIns({
    url: '/addToCart',
    method: 'post',
    data,
  });
}

export function inCartStatus(data) {
  return axiosIns({
    url: '/inCartStatus',
    method: 'post',
    data,
  });
}
