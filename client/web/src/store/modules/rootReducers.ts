import { combineReducers } from 'redux';

import auth from './auth/reducer';
import { UserData } from './auth/actions';

import modal from './modal/reducer.js';

// export interface StoreState {
//   auth: UserData;
//   modal: any;
// }

export default combineReducers({ modal });
