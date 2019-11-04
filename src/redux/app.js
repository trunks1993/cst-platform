import _ from 'lodash';
import { actions as gridActions } from './grid';

// action types
export const types = {
  TOGGLE_PROPERTY: 'app/TOGGLE_PROPERTY',
  SET_TAGVIEWS: 'app/SET_TAGVIEWS',
  CHANGE_ACTIVE_TAG: 'app/CHANGE_ACTIVE_TAG',
  DELETE_TAG: 'app/DELETE_TAG'
};

// 判断此配置id对应的layIds数据是否存在 存在则选中第一个
const selectLayout = (gridActions, getState, dispatch) => {
  const { appState: { activeTagId }, gridState: { byConfigId } } = getState();
  const layIds = byConfigId[activeTagId];
  const layIdsNotEmpty = Array.isArray(layIds) && layIds.length > 0;
  const activeLayId = layIdsNotEmpty ? layIds[0] : '';
  dispatch(gridActions.selectLayout(activeLayId));
};

// action creators
export const actions = {
  _setTagViews: tag => ({ type: types.SET_TAGVIEWS, tag }),
  _changeActiveTag: id => ({ type: types.CHANGE_ACTIVE_TAG, id }),
  _deleteTag: id => ({ type: types.DELETE_TAG, id }),
  setTagViews: tag => (dispatch, getState) => {
    dispatch(actions._setTagViews(tag));
    selectLayout(gridActions, getState, dispatch);
  },
  changeActiveTag: id => (dispatch, getState) => {
    dispatch(actions._changeActiveTag(id));
    selectLayout(gridActions, getState, dispatch);
  },
  deleteTag: id => (dispatch, getState) => {
    dispatch(actions._deleteTag(id));
    dispatch(gridActions.removeCfgId(id));
    selectLayout(gridActions, getState, dispatch);
  }
};

// 初始化state
const initialState = {
  tagViews: {
    ids: [],
    byId: {}
  },
  activeTagId: '',
  propertyVisible: false
};

// tagViews: {
//      byId: {
//          '123': {},
//      }
//     ids: []
// },

// reducer
// eslint-disable-next-line complexity
export default function reducer(state = initialState, action) {
  let tagViews;
  switch (action.type) {
    case types.SET_TAGVIEWS:
      const { cfgId: id } = action.tag;
      tagViews = {
        byId: {
          ...state.tagViews.byId,
          [id]: action.tag
        },
        ids: [...state.tagViews.ids, id]
      };
      return { ...state, tagViews, activeTagId: id };

    case types.CHANGE_ACTIVE_TAG:
      return { ...state, activeTagId: action.id };

    case types.DELETE_TAG:
      const oldIds = state.tagViews.ids;
      const delId = action.id;
      const delIndex = _.findIndex(oldIds, id => id === delId);
      // 如果删除的标签id等于当前活跃的标签id 则需要使用lastid
      let lastId;
      // 如果要删除的Id大于1则取前一个id
      if (delIndex > 0) lastId = oldIds[delIndex - 1];
      // 如果等于0 取后一个id
      else if (delIndex === 0) lastId = oldIds[delIndex + 1] || '';

      tagViews = {
        byId: {
          ...state.tagViews.byId,
        },
        ids: _.filter(oldIds, id => id !== action.id)
      };
      const activeTagId = state.activeTagId === delId ? lastId : state.activeTagId;
      return { ...state, tagViews, activeTagId };
    default: return state;
  }
}
