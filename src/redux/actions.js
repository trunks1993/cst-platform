import { login, getUserByToken } from '@/api/index';

import { queryConfig } from '@/api/cs_api';

import { setToken, removeToken } from '@/utils/auth';

// 通知 reducer 请求开始的 user
export const REQUEST_USER = 'REQUEST_USER';

export const REQUEST_GROUP = 'REQUEST_GROUP';

// 保存当前登陆者的信息
export const SAVE_CONFIG = 'SAVE_CONFIG';

export const RECEIVE_USER = 'RECEIVE_USER';

export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export function requestUser() {
  return { type: REQUEST_USER, isFetch: true };
}

export function requestGroup() {
  return { type: REQUEST_GROUP, isFetch: true };
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    isFetch: false,
    user
  };
}

function receiveGroup(group) {
  return {
    type: RECEIVE_GROUP,
    isFetch: false,
    group
  };
}

function recevieUserOnError(message) {
  return {
    type: RECEIVE_USER,
    isFetch: false,
    errorMsg: message
  };
}

// 异步请求action 上面3个基础的action整合
export function getUser(token) {
  return dispatch => {
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    dispatch(requestUser());
    // 异步请求后端接口
    return getUserByToken(token).then(
      res => dispatch(receiveUser(res.data)),
      error => dispatch(recevieUserOnError('error'))
    );
  };
}

export function loginByUsername(username, password) {
  return dispatch => {
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    dispatch(requestUser());
    // 异步请求后端接口
    return login(username, password).then(
      async res => {
        console.log('res: ', res);
        res.data.user = {
          id: 1554121,
          name: 'trunks',
          menu: [
            {
              id: 0,
              title: '人员管理',
              children: [{
                id: 1,
                title: '戒毒人员管理',
                path: '/tablePageTest',
                component: 'tablePageTest'
              }]
            }
          ]
        };
        setToken(res.data.token);
        return dispatch(receiveUser(res.data.user));
      },
      error => dispatch(recevieUserOnError('error'))
    );
  };
}

export const loginOut = () => dispatch => {
  removeToken();
  return dispatch(receiveUser({}));
};

// 异步请求action 上面3个基础的action整合
export function getCSGroup() {
  return dispatch => {
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    dispatch(requestGroup());
    // 异步请求后端接口
    return queryConfig().then(
      res => dispatch(receiveGroup(res.data)),
      error => dispatch(recevieUserOnError('error'))
    );
  };
}
