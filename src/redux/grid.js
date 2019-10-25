import { queryByConfigId } from '@/api/cs_api';
import _ from 'lodash';
// action types
export const types = {
  START_FETCH: 'grid/START_FETCH',
  SET_ERROR: 'grid/SET_ERROR',
  RECEIVE_DATA: 'grid/RECEIVE_DATA', // 初始化加载数据
  ADD_LAYOUT: 'grid/ADD_LAYOUT', // 设置当前的数据
  SET_ACTIVE_LAYID: 'grid/SET_ACTIVE_LAYId', // 设置选中layout
  SET_LAYOUTS_BY_ID: 'grid/SET_LAYOUTS_BY_ID', // 根据id更新layout布局信息
  REST_LAYOUTS: 'grid/REST_LAYOUTS', // 重置
  REMOVE_CFGID: 'grid/REMOVE_CFGID' //
};

// action creators
export const actions = {
  startFetch: () => ({ type: types.START_FETCH }),
  setError: error => ({ type: types.SET_ERROR, payload: error }),
  setData: data => ({ type: types.RECEIVE_DATA, data }),
  addLayout: layout => ({ type: types.ADD_LAYOUT, layout }),
  changeLayouts: layouts => ({ type: types.SET_LAYOUTS_BY_ID, layouts }),
  selectLayout: id => ({ type: types.SET_ACTIVE_LAYID, id }),
  restLayouts: () => ({ type: types.REST_LAYOUTS }),
  removeCfgId: cfgId => ({ type: types.REMOVE_CFGID, cfgId }),
  queryByConfigId: (cfgId, byConfigId) => dispatch => {
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    // 如果需要再次請求清楚byConfigId中的对应cfgId
    const flag = _.has(byConfigId, cfgId);
    if (flag) return dispatch(actions.setData({ layIds: byConfigId[cfgId], cfgId }));
    dispatch(actions.startFetch());
    // 异步请求后端接口
    return queryByConfigId(cfgId).then(
      res => dispatch(actions.setData({ data: res.data, cfgId })),
      error => dispatch(actions.setError(error))
    );
  }
};

// 初始化state
const initialState = {
  isFetching: false,
  currentData: {},
  prevData: {},
  // layIds: [],
  byConfigId: {},
  activeLayId: '',
  error: null,
};

// const prevData = {
//   '1': {
//     cfiId: 'aaa',
//     cfiConfigId: '86'
//   },
//   '2': {
//     cfiId: 'aaa',
//     cfiConfigId: '86'
//   }
// };

// const currentData = {
//   '1': {
//     cfiId: 'aaa',
//     cfiConfigId: '86'
//   },
//   '2': {
//     cfiId: 'aaa',
//     cfiConfigId: '86'
//   }
// };

// const byConfigId = {
//   '86': ['1', '2'],
//   '87': ['2'],
// };

// reducer helper
const getLayerIdMap = (data) => {
  const currentData = {};
  // 拷贝data
  const layIds = _.map(data, v => {
    const t = _.clone(v);
    const cfiLayout = JSON.parse(t.cfiLayout);
    t.cfiLayout = cfiLayout;
    currentData[cfiLayout.i] = t;
    return cfiLayout.i;
  });

  return { currentData, layIds };
};

// reducer
// eslint-disable-next-line complexity
export default function reducer(state = initialState, action) {
  let newCurrentData;
  switch (action.type) {
    case types.RECEIVE_DATA:
      const noRequest = _.has(action.data, 'layIds');
      if (noRequest) return state;
      const { currentData, layIds } = getLayerIdMap(action.data.data);

      // configId 对应的 layout
      const byConfigId = {
        ...state.byConfigId,
        [action.data.cfgId]: layIds
      };

      return { ...state, isFetching: false, byConfigId, currentData: { ...state.currentData, ...currentData }, prevData: currentData };

    case types.START_FETCH:
      return { ...state, isFetching: true };

    case types.SET_ERROR:
      return { ...state, error: action.payload };

    case types.ADD_LAYOUT:
      const { currentData: c, cfiConfigId } = action.layout;
      const id = _.findLastKey(c);
      newCurrentData = {
        ...state.currentData,
        ...c
      };

      const obj = _.mergeWith({ [cfiConfigId]: [id] }, state.byConfigId, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      });
      return { ...state, activeLayId: id, currentData: newCurrentData, byConfigId: obj };

    case types.SET_ACTIVE_LAYID:
      return { ...state, activeLayId: action.id };

    case types.SET_LAYOUTS_BY_ID:
      const { layouts } = action;

      const temp = _.clone(state.currentData);

      _.map(layouts, l => {
        temp[l.i].cfiLayout = l;
      });
      return { ...state, currentData: temp };

    case types.REST_LAYOUTS:
      const newd = JSON.parse(JSON.stringify(state.prevData));
      return { ...state, currentData: newd };

    case types.REMOVE_CFGID:
      return { ...state, byConfigId: _.omit(state.byConfigId, [action.cfgId]) };
    default: return state;
  }
}
