import { combineReducers } from 'redux';

import auth from './auth/reducer';
import truckProfile from './truckProfile/reducer';
import schedules from './schedules/reducer';
import menus from './menus/reducer';
import modals from './modals/reducers';

export default combineReducers({
  auth,
  truckProfile,
  schedules,
  menus,
  modals,
});
