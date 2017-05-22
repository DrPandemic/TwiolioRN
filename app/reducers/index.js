import { combineReducers } from 'redux';
import * as AccountReducers from './account'

export default combineReducers(Object.assign({},
  AccountReducers,
));
