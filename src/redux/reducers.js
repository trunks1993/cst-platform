import { combineReducers } from 'redux';
import { RECEIVE_USER, RECEIVE_GROUP } from './actions';

function user(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
}

function group(state = {}, action) {
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.group;
    default:
      return state;
  }
}


export default combineReducers({
  user,
  group
});
