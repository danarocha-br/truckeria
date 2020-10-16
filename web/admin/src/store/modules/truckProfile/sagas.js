import { takeLatest, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import ActionTypes from './types';
import { truckProfileError, truckProfileSuccess, loadTruckProfileSuccess } from './actions';
import api from '~/services/api';

export function* createFoodTruckProfile({ payload: { data } }) {

  try {
    const response = yield call(api.post, 'foodtruck/profile', {
      ...data,
    });
    yield put(truckProfileSuccess(response.data));
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(truckProfileError(error));
  }
}

export function* loadTruckProfiles() {
  try {
    const response = yield call(api.get, 'foodtruck/profile');
    const truckProfiles = response.data.map(truckProfile => ({
      ...truckProfile,
    }));

    yield put(loadTruckProfileSuccess(truckProfiles));
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(truckProfileError(error));
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_TRUCK_PROFILE_REQUEST, createFoodTruckProfile),
  takeLatest(ActionTypes.LOAD_TRUCK_PROFILE_REQUEST, loadTruckProfiles),
]);
