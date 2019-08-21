/**
 * Created by supervons on 2019/08/20.
 * 总 Reducer，通过 combineReducers 来集合多个子 Reducer，以便于业务上的区分
 * main Reducer, it includes other subReducer, help us easy to understand.
 */
import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import SettingReducer from './settingReducer';

const rootReducer = combineReducers({
  UserReducer,
  SettingReducer
});

export default rootReducer;
