import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/bpm/cas/login',
    method: 'post',
    params: {
      username,
      password
    }
  });
}

export function getUserDetail(token) {
  return request({
    url: '/bpm/cas/user',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'token': token
    }
  });
}

export const getUserByToken = token => request({
  url: `/user/getUserByToken?token=${token}`,
  method: 'get'
});

export const getTableList = queryList => request({
  url: `/user/getTableList?current=${queryList.current}&pageSize=${queryList.pageSize}`,
  method: 'get'
});
