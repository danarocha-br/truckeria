import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import truckProfile from './truckProfile/sagas';
import schedules from './schedules/sagas';

export default function* rootSaga() {
  return yield all([auth, truckProfile, schedules ]);
}
