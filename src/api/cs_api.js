import request from '@/utils/request';

// 获取所有配置组以及组的子节点
export function queryConfig() {
  return request({
    url: '/v1/cusConfig/queryConfig',
    method: 'get'
  });
}

// 保存当前配置
export function saveGroupConfig({ cfgParentId, configName }) {
  return request({
    url: '/v1/cusConfig/addConfig',
    method: 'put',
    params: {
      cfgName: configName,
      cfgParentId
    }
  });
}

// 删除指定配置
export function deleteGroupConfig(id, token) {
  return request({
    url: '/v1/cusConfig/deleteConfig',
    method: 'delete',
    headers: {
      'token': token
    },
    id
  });
}

// 根据当前配置的 id 查询配置项数据
export function queryByConfigId(configId) {
  return request({
    url: '/v1/cusConfig/queryByConfigId',
    method: 'get',
    params: {
      configId
    }
  });
}

// 查询组的信息
export function getSelectParent() {
  return request({
    url: '/v1/cusConfig/selectParent',
    method: 'get'
  });
}

export function saveInfo(arr) {
  return request({
    url: '/v1/cusFunctionInfo/saveInfo',
    method: 'post',
    data: arr
  });
}

// 查询数据源id /v1/cusDataSource/selectByDataSource
export function selectByDataSource(cdsChartId, cdsSystemId, cdsOdbcType) {
  return request({
    url: '/v1/cusDataSource/selectByDataSource',
    method: 'get',
    params: {
      cdsChartId,
      cdsSystemId,
      cdsOdbcType
    }
  });
}

export function updateStauts(cfgId, cfgStatus, cfgUpdayeId) {
  return request({
    url: '/v1/cusDataSource/selectByDataSource',
    method: 'get',
    params: {
      cfgId,
      cfgStatus,
      cfgUpdayeId
    }
  });
}
