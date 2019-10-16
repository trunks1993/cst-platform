import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/userbpm/cas/login',
    method: 'post',
    params: {
      username,
      password
    }
  });
}

export function getUserDetail(token) {
  return request({
    url: '/userbpm/cas/user',
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
// 获取公共模板列表
export const getPublicTemp = params => request({
  url: `/user/getTableList?current=${params.current}&pageSize=${params.pageSize}`,
  method: 'get'
});
// 获取个人模板列表
export const getStaticTemp = params => request({
  url: '/userbpm/v1/userConfigInfo/CusUserConfig/select',
  method: 'get',
  headers: {
    token: params.token
  }
});
// 新建个人模板
export const addStaticTemp = par => request({
  url: '/userbpm/v1/userConfigInfo/CusUserConfig/add',
  method: 'post',
  headers: {
    token: par.token
  },
  params: {
    cucName: par.cucName,
    cucStatus: par.cucStatus,
    cucRemake: '1'
  }
});
// 获取左下角echarts配置
export const getEchartsList = token => request({
  url: '/userbpm/v1/functionInfo/functionInfo/list',
  method: 'get',
  headers: {
    token
  }
});

// 获取配置页详细信息
export const getTempDetail = (token, configId) => request({
  url: '/userbpm/v1/userConfigInfo/userFunctionInfo/list',
  method: 'get',
  headers: {
    token
  },
  params: {
    configId
  }
});

// 保存
export const saveTempGridData = (par) => request({
  url: '/userbpm/v1/userConfigInfo/userFunctionInfo/add',
  method: 'post',
  headers: {
    token: par.token
  },
  params: {
    configId: par.configId,
    functionInfoId: par.functionInfoId,
    layout: par.layout
  }
});

// 删除
export const deleteTemp = (par) => request({
  url: '/userbpm/v1/userConfigInfo/CusUserConfig/remove',
  method: 'DELETE',
  headers: {
    token: par.token
  },
  params: {
    cucId: par.cucId
  }
});
