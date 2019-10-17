import request from '@/utils/request';

// 获取所有配置组以及组的子节点
export function queryConfig(token) {
  return request({
    url: '/v1/cusConfig/queryConfig',
    method: 'get',
    headers: {
      'token': token
    }
  });
}

// 保存当前配置
export function saveGroupConfig({ cfgParentId, configName }, token) {
  return request({
    url: '/v1/cusConfig/addConfig',
    method: 'put',
    headers: {
      'token': token
    },
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
export function queryByConfigId(id, token) {
  return request({
    url: '/v1/cusConfig/queryByConfigId',
    method: 'get',
    headers: {
      'token': token
    },
    configId: id
  });
}

// 查询组的信息
export function getSelectParent(token) {
  return request({
    url: '/v1/cusConfig/selectParent',
    method: 'get',
    headers: {
      'token': token
    }
  });
}
