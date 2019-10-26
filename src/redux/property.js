import _ from 'lodash';
import { selectByDataSource } from '@/api/cs_api';

// action types
export const types = {
  START_FETCH: 'property/START_FETCH',
  RECEIVE_DATA: 'property/RECEIVE_DATA',
};

// action creators
export const actions = {
  startFetch: () => ({ type: types.START_FETCH }),
  setData: data => ({ type: types.RECEIVE_DATA, data }),
  setDsOptions: (cdsOdbcId, cdsOdbcType, cdsSystemId) => (dispatch, getState) => {
    const key = `${cdsOdbcId}-${cdsOdbcType}-${cdsSystemId}`;
    const { propertyState: { optionsKey } } = getState();
    // 如果存在key vlaue 则不请求
    if (_.findIndex(optionsKey, key) !== -1) return;
    dispatch(actions.startFetch());
    return selectByDataSource(cdsOdbcId, cdsOdbcType, cdsSystemId).then(res => {
      dispatch(actions.setData({
        [key]: res.data
      }));
    });
  }
};

// 初始化state
// cdsOdbcId-cdsOdbcType-cdsSystemId : []
const initialState = {
  isFetching: false,
  dsOptions: {},
  optionsKey: []
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
      const optionsKey = _.concat(state.optionsKey, _.findLastKey(action.data));
      return { ...state, isFetching: false, dsOptions, optionsKey };
    default: return state;
  }
}
