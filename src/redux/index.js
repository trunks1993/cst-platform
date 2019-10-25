import { combineReducers } from 'redux';
import userState from './user';
import configGroupState from './configGroup';
import gridState from './grid';
import appState from './app';


export default combineReducers({
  userState,
  configGroupState,
  gridState,
  appState
});
