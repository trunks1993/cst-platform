import _ from 'lodash';
import { selectByDataSource } from '@/api/cs_api';

// action types
export const types = {
  START_FETCH: 'property/START_FETCH',
  RECEIVE_DATA: 'property/RECEIVE_DATA',
  CURRENT_VALIDATE: 'property/CURRENT_VALIDATE'
};

// action creators
export const actions = {
  startFetch: () => ({ type: types.START_FETCH }),
  setData: data => ({ type: types.RECEIVE_DATA, data }),
  setDsOptions: (cdsChartId, cdsOdbcType, cdsSystemId) => (dispatch, getState) => {
    const key = `${cdsChartId}-${cdsOdbcType}-${cdsSystemId}`;
    const { propertyState: { optionsKey } } = getState();
    // 如果存在key vlaue 则不请求
    if (_.findIndex(optionsKey, v => v === key) !== -1) return;
    dispatch(actions.startFetch());
    return selectByDataSource(cdsChartId, cdsOdbcType, cdsSystemId).then(res => {
      dispatch(actions.setData({
        [key]: res.data
      }));
    });
  },
  setCurrentValidate: fn => ({ type: types.CURRENT_VALIDATE, fn }),
};

// 初始化state
// cdsChartId-cdsOdbcType-cdsSystemId : []
const initialState = {
  isFetching: false,
  dsOptions: {},
  optionsKey: [],
  validateFields: function() {}
};

// reducer
// eslint-disable-next-line complexity
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.START_FETCH:
      return { ...state, isFetching: true };
    case types.RECEIVE_DATA:
      const dsOptions = {
        ...state.dsOptions,
        ...action.data
      };
      const optionsKey = _.concat(state.optionsKey, _.findKey(action.data));
      return { ...state, isFetching: false, dsOptions, optionsKey };
    case types.CURRENT_VALIDATE:
      return { ...state, validateFields: action.fn };
    default: return state;
  }
}
