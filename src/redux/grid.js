import { queryByConfigId } from '@/api/cs_api';
import { actions as appActions } from './app';
import { actions as propertyActions } from './property';

import _ from 'lodash';
// action types
export const types = {
  START_FETCH: 'grid/START_FETCH',
  SET_ERROR: 'grid/SET_ERROR',
  RECEIVE_DATA: 'grid/RECEIVE_DATA', // 初始化加载数据
  ADD_LAYOUT: 'grid/ADD_LAYOUT', // 设置当前的数据
  SET_ACTIVE_LAYID: 'grid/SET_ACTIVE_LAYId', // 设置选中layout
  SET_LAYOUTS_BY_ID: 'grid/SET_LAYOUTS_BY_ID', // 根据id更新layout布局信息
  REMOVE_CFGID: 'grid/REMOVE_CFGID', //
  FORM_FIELD: 'grid/FORM_FIELD',
  REMOVE_LAYITEM: 'grid/REMOVE_LAYITEM'
};

// action creators
export const actions = {
  startFetch: () => ({ type: types.START_FETCH }),
  setError: error => ({ type: types.SET_ERROR, payload: error }),
  setData: data => ({ type: types.RECEIVE_DATA, data }),
  _addLayout: layout => ({ type: types.ADD_LAYOUT, layout }),
  addLayout: layout => dispatch => {
    dispatch(actions._addLayout(layout));
    const id = _.findKey(layout);
    dispatch(actions.selectLayout(id));
  },
  _removeLayItem: layByCfg => ({ type: types.REMOVE_LAYITEM, layByCfg }),
  removeLayItem: layId => (dispatch, getState) => {
    const { appState: { activeTagId } } = getState();
    dispatch(actions._removeLayItem({ layId, cfgId: activeTagId }));
  },

  changeLayouts: layouts => ({ type: types.SET_LAYOUTS_BY_ID, layouts }),
  _selectLayout: id => ({ type: types.SET_ACTIVE_LAYID, id }),
  selectLayout: id => (dispatch, getState) => {
    dispatch(actions._selectLayout(id));
    const { gridState: { currentData, activeLayId } } = getState();
    const { cfiType: cdsChartId, cdsOdbcType } = _.get(currentData, activeLayId, {});
    if (cdsChartId && cdsOdbcType) dispatch(propertyActions.setDsOptions(cdsChartId, cdsOdbcType, 1));
  },
  removeCfgId: cfgId => ({ type: types.REMOVE_CFGID, cfgId }),
  // eslint-disable-next-line complexity
  queryByConfigId: tag => (dispatch, getState) => {
    const { cfgId } = tag;
    // 首次 dispatch：更新应用的 state 来通知API 请求发起了
    // 如果需要再次請求清楚byConfigId中的对应cfgId
    const { gridState: { byConfigId }, appState: { tagViews, activeTagId } } = getState();
    // 是否标签已经存在
    const cfgIdIndex = _.findIndex(tagViews.ids, id => id === cfgId);
    // 不存在先添加标签tag
    if (cfgIdIndex === -1) {
      dispatch(appActions.setTagViews(tag));
    } else {
      // 如果存在 但不是选中标签则选中它
      if (activeTagId !== cfgId) dispatch(appActions.changeActiveTag(cfgId));
    }

    // 是否请求cfgId 对应的配置信息 如果已经缓存则不请求
    const hasLay = _.has(byConfigId, cfgId);
    if (!hasLay) {
      dispatch(actions.startFetch());
      // 异步请求后端接口
      return queryByConfigId(cfgId).then(
        res => {
          dispatch(actions.setData({ data: res.data, cfgId }));
          // 默认获取第一个组件高亮
          const cfiLayout = _.get(res, 'data[0].cfiLayout', '');
          const firstLayId = cfiLayout === '' ? '' : JSON.parse(cfiLayout).i;
          dispatch(actions.selectLayout(firstLayId));
        },
        error => dispatch(actions.setError(error))
      );
    }
  },
  setFormField: field => ({ type: types.FORM_FIELD, field })
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
    const cfiEvent = JSON.parse(t.cfiEvent);

    t.cfiLayout = cfiLayout;
    t.cfiEvent = cfiEvent;
    t.cdsOdbcType = t.cusDataSource.cdsOdbcType;
    t.cdsOdbcValue = t.cusDataSource.cdsOdbcValue;
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
      // const { currentData: c, cfiConfigId } = action.layout;
      const newLayout = action.layout;
      const id = _.findKey(newLayout);
      const data = newLayout[id];
      newCurrentData = {
        ...state.currentData,
        [id]: data
      };
      const { cfiConfigId } = data;
      const newByConfigId = _.mergeWith({ [cfiConfigId]: [id] }, state.byConfigId, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      });
      return { ...state, currentData: newCurrentData, byConfigId: newByConfigId };

    case types.SET_ACTIVE_LAYID:
      return { ...state, activeLayId: action.id };

    case types.SET_LAYOUTS_BY_ID:
      const { layouts } = action;

      const temp = _.clone(state.currentData);

      _.map(layouts, l => {
        temp[l.i].cfiLayout = l;
      });
      return { ...state, currentData: temp };

    case types.REMOVE_CFGID:
      return { ...state, byConfigId: _.omit(state.byConfigId, [action.cfgId]) };

    case types.FORM_FIELD:
      const fieldObj = action.field;
      const name = _.findKey(fieldObj, o => o || o === '');
      const value = fieldObj[name];
      const { currentData: _currentData, activeLayId: _activeLayId } = state;
      const cloneCurrentData = _.clone(_currentData);
      _.set(cloneCurrentData, `${_activeLayId}.${name}`, value);
      return { ...state, currentData: cloneCurrentData };

    case types.REMOVE_LAYITEM:
      const { layId, cfgId } = action.layByCfg;
      const arr = _.filter(state.byConfigId[cfgId], id => id !== layId);
      return { ...state, byConfigId: { ...state.byConfigId, [cfgId]: arr } };

    default: return state;
  }
}
