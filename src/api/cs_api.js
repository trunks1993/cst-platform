import request from '@/utils/request';

// 获取所有配置组以及组的子节点
export function queryConfig(cfgName = '') {
  return request({
    url: '/v1/cusConfig/queryConfig',
    method: 'get',
    params: {
      cfgName
    }
  });
}

// 保存当前配置
export function saveGroupConfig(cfgParentId, cfgName) {
  return request({
    url: '/v1/cusConfig/addConfig',
    method: 'post',
    params: {
      cfgName,
      cfgParentId
    }
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

export function saveInfo(arr, cfgId) {
  return request({
    url: '/v1/cusFunctionInfo/saveInfo',
    method: 'post',
    headers: {
      cfgId
    },
    data: arr
  });
}

// 查询数据源id /v1/cusDataSource/selectByDataSource
export function selectByDataSource(cdsChartId, cdsOdbcType, cdsSystemId) {
  return request({
    url: '/v1/cusDataSource/selectByDataSource',
    method: 'get',
    params: {
      cdsChartId,
      cdsOdbcType,
      cdsSystemId
    }
  });
}

export function updateStauts(cfgId, cfgStatus, cfgUpdayeId) {
  return request({
    url: '/v1/cusConfig/updateStatus',
    method: 'put',
    data: {
      cfgId,
      cfgStatus
    }
  });
}

// 删除组
export function deleteConfig(id) {
  return request({
    url: '/v1/cusConfig/deleteConfig',
    method: 'delete',
    params: {
      id
    }
  });
}

// GET /v1/cusFunctionInfo/selectRepeat
export function selectRepeat(cfiName, cfiId) {
  return request({
    url: '/v1/cusFunctionInfo/selectRepeat',
    method: 'get',
    params: {
      cfiName,
      cfiId
    }
  });
}
