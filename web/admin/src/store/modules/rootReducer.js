import { combineReducers } from 'redux';

import auth from './auth/reducer';
import truckProfile from './truckProfile/reducer';
import schedules from './schedules/reducer';

export default combineReducers({
  auth,
  truckProfile,
  schedules
});
