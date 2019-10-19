import request from '@/utils/request';

// 登陆
export function login(username, password) {
  return request({
    url: '/cas/login',
    method: 'post',
    params: {
      username,
      password
    }
  });
}

// 获取当前用户信息
export function getUserByToken(token) {
  return request({
    url: '/cas/user',
    method: 'get'
  });
}
// 获取公共模板列表
export const getPublicTemp = params => request({
  url: '/v1/userConfigInfo/CusUserConfig/list',
  method: 'get',
  params: {
    cucIsShare: '1'
  }
});

// 获取个人模板列表
export const getStaticTemp = params => request({
  url: '/v1/userConfigInfo/CusUserConfig/queryUserById',
  method: 'get'
});

// 新建个人模板
export const addStaticTemp = par => request({
  url: '/v1/userConfigInfo/CusUserConfig/add',
  method: 'post',
  params: {
    cucName: par.cucName,
    cucStatus: par.cucStatus,
    cucRemake: '1'
  }
});
// 获取左下角echarts配置
export const getEchartsList = token => request({
  url: '/v1/functionInfo/functionInfo/list',
  method: 'get'
});

// 获取配置页详细信息
export const getTempDetail = (token, configId) => request({
  url: '/v1/userConfigInfo/userFunctionInfo/list',
  method: 'get',
  params: {
    configId
  }
});

// 保存 或 发布
export const saveTempGridData = (data) => request({
  url: '/v1/userConfigInfo/userFunctionInfo/add',
  method: 'post',
  data
});

// 删除
export const deleteTemp = (par) => request({
  url: '/v1/userConfigInfo/CusUserConfig/remove',
  method: 'DELETE',
  params: {
    cucId: par.cucId
  }
});

// home首页详情
export const getHomeDetail = () => request({
  url: '/v1/userConfigTopic/userConfigTopic/list',
  method: 'GET',
});

