import _ from 'lodash';

// action types
export const types = {
  TOGGLE_PROPERTY: 'app/TOGGLE_PROPERTY',
  SET_TAGVIEWS: 'app/SET_TAGVIEWS',
  CHANGE_ACTIVE_TAG: 'app/CHANGE_ACTIVE_TAG',
  DELETE_TAG: 'app/DELETE_TAG'
};

// action creators
export const actions = {
  setTagViews: tag => ({ type: types.SET_TAGVIEWS, tag }),
  changeActiveTag: id => ({ type: types.CHANGE_ACTIVE_TAG, id }),
  deleteTag: id => ({ type: types.DELETE_TAG, id })
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
      const id = _.findLastKey(action.tag);
      if (id === state.activeTagId) return state;
      tagViews = {
        byId: {
          ...state.tagViews.byId,
          ...action.tag
        },
        ids: _.uniq([...state.tagViews.ids, id])
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
