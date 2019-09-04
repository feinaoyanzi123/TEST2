import { combineReducers } from 'redux';
import login from './loginReducer';
import common from './commonReducer';
//import pingce from './pingceReducer';

const rootReducer = combineReducers({
  common: common,
  login: login,
  //pingce: pingce,
});

export default rootReducer;