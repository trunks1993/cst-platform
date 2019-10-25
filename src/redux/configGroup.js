import { queryConfig } from '@/api/cs_api';
import _ from 'lodash';
// action types
export const types = {
  START_FETCH: 'configGroup/START_FETCH',
  SET_ERROR: 'configGroup/SET_ERROR',
  TOGGLE_VIEWS: 'configGroup/TOGGLE_VIEWS',
  RECEIVE_DATA: 'configGroup/RECEIVE_DATA',
};

// action creators
export const actions = {
  startFetch: () => ({ type: types.START_FETCH }),
  setError: error => ({ type: types.SET_ERROR, payload: error }),
  setData: configGroup => ({ type: types.RECEIVE_DATA, configGroup }),
  // 控制显示隐藏效果
  setVisibleIds: id => ({ type: types.TOGGLE_VIEWS, id }),
  getConfigGroup: cfgName => dispatch => {
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    dispatch(actions.startFetch());
    // 异步请求后端接口
    return queryConfig(cfgName).then(
      res => dispatch(actions.setData(res.data)),
      error => dispatch(actions.setError(error))
    );
  }
};

// 初始化state
const initialState = {
  isFetching: false,
  configGroup: [],
  visibleIds: [],
  error: null,
};

// reducer
// eslint-disable-next-line complexity
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_DATA:
      return { ...state, isFetching: false, configGroup: action.configGroup };
    case types.START_FETCH:
      return { ...state, isFetching: true };
    case types.SET_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case types.TOGGLE_VIEWS:
      // 如果存在id删除 不存在插入
      const index = _.findIndex(state.visibleIds, id => action.id === id);
      const newVisibleIds = index === -1 ? [...state.visibleIds, action.id] : _.filter(state.visibleIds, id => id !== action.id);
      return { ...state, visibleIds: newVisibleIds };
    default: return state;
  }
}
