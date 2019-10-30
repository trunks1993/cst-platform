import request from '@/utils/request';
import md5 from 'js-md5';

// 登陆
export function login({ username, password }) {
  return request({
    url: '/cas/login',
    method: 'post',
    params: {
      username,
      password: md5(password)
    }
  });
}

// 获取当前用户信息
export function getUserByToken() {
  return request({
    url: '/cas/user',
    method: 'get'
  });
}
// 获取公共模板列表
export const getPublicTemp = () => request({
  url: '/v1/userConfigInfo/CusUserConfig/list',
  method: 'get'
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
  data: {
    cucName: par.cucName,
    cucStatus: par.cucStatus,
    cucRemake: ''
  }
});

// 获取左下角echarts配置
export const getEchartsList = () => request({
  url: '/v1/functionInfo/functionInfo/list',
  method: 'get'
});

// 获取配置页详细信息
export const getTempDetail = (configId) => request({
  url: '/v1/userFunctionInfo/userFunctionInfo/list',
  method: 'get',
  params: {
    configId
  }
});

// 保存 或 发布
export const saveTempGridData = (data) => request({
  url: '/v1/userFunctionInfo/userFunctionInfo/add',
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
  method: 'GET'
});

// 发布
export const editTempGridData = (cucStatus, cucID) => request({
  url: '/v1/userConfigInfo/CusUserConfig/edit',
  method: 'put',
  params: {
    cucStatus,
    cucID
  }
});

// 共享
export const shareTempGridData = (cucIsShare, cucID) => request({
  url: '/v1/userConfigInfo/CusUserConfig/editShare',
  method: 'put',
  params: {
    cucIsShare,
    cucID
  }
});

// 单独获取每个图表的数据GET /v1/userConfigTopic/userConfigTopic/queryFrequency
export const applySingleEchartsInfo = (cufId) => request({
  url: '/v1/userConfigTopic/userConfigTopic/queryFrequency',
  method: 'get',
  params: {
    cufId
  }
});

// 模糊查询
export const fuzzyQueryTemp = (configName) => request({
  url: '/v1/userConfigInfo/CusUserConfig/queryByName',
  method: 'get',
  params: {
    configName
  }
});
