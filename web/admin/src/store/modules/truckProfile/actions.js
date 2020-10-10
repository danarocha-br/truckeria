import ActionTypes from './types';

export function truckProfileRequest(data) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_REQUEST,
    payload: { data },
  };
}

export function truckProfileSuccess(truckProfile) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_SUCCESS,
    payload: { truckProfile },
  };
}

export function truckProfileError() {
  return {
    type: ActionTypes.TRUCK_PROFILE_FAILTURE,
  };
}

export function loadTruckProfileRequest() {
  return {
    type: ActionTypes.LOAD_TRUCK_PROFILE_REQUEST
  };
}

export function loadTruckProfileSuccess(truckProfiles) {
  return {
    type: ActionTypes.LOAD_TRUCK_PROFILE_SUCCESS,
    payload: { truckProfiles },
  };
}
