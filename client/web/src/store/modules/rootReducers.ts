import { combineReducers } from 'redux';

import auth from './auth/reducer';
import { UserData } from './auth/actions';

export interface StoreState {
  auth: UserData;
}

export default combineReducers<StoreState>({ auth });
