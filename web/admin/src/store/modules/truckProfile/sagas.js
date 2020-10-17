import { takeLatest, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import ActionTypes from './types';
import {
  createTruckProfileFailure,
  createTruckProfileSuccess,
  loadTruckProfileSuccess,
  loadTruckProfileFailure,
  deleteTruckProfileFailure,
  deleteTruckProfileSuccess
 } from './actions';
import api from '~/services/api';

export function* createFoodTruckProfile({ payload: { data } }) {

  try {
    const response = yield call(api.post, 'foodtruck/profile', {
      ...data,
    });
    yield put(createTruckProfileSuccess(response.data));
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(createTruckProfileFailure(error));
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
    yield put(loadTruckProfileFailure(error));
  }
}

export function* deleteTruckProfile({ payload: { truck_id }}) {
  try {
    yield call(api.delete, `schedules/${truck_id}`);

    yield put(deleteTruckProfileSuccess(truck_id));
    toast.success('Your food truck profile was deleted successfully.');

  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(deleteTruckProfileFailure({message: error.response.data.message, error}));
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_TRUCK_PROFILE_REQUEST, createFoodTruckProfile),
  takeLatest(ActionTypes.LOAD_TRUCK_PROFILE_REQUEST, loadTruckProfiles),
  takeLatest(ActionTypes.DELETE_TRUCK_PROFILE_REQUEST, deleteTruckProfile),
]);
