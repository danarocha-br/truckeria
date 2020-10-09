import { combineReducers } from 'redux';

import auth from './auth/reducer';
import truckProfile from './truckProfile/reducer';

export default combineReducers({
  auth,
  truckProfile,
});
