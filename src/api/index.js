import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
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

export const getPublicTemp = params => request({
  url: `/user/getTableList?current=${params.current}&pageSize=${params.pageSize}`,
  method: 'get'
});

export const getStaticTemp = params => request({
  url: `/v1/userConfigInfo/CusUserConfig/select?cucUserId=${params.cucUserId}`,
  method: 'get',
  params: {
    token: params.token
  }
});
