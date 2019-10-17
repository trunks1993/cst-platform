import { combineReducers } from 'redux';
import { RECEIVE_USER, SAVE_CONFIG } from './actions';

function user(state = { data: [] }, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SAVE_CONFIG:
      return { ...state, ...{ data: action.data } };
    default:
      return state;
  }
}


export default combineReducers({
  user
});
