import ActionTypes from './types';

// create
export function createTruckProfileRequest(data) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_REQUEST,
    payload: { data },
  };
}

export function createTruckProfileSuccess(truckProfile) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_SUCCESS,
    payload: { truckProfile },
  };
}

export function createTruckProfileFailure(error) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_FAILURE,
    payload: error
  };
}

// list
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

export function loadTruckProfileFailure(error) {
  return {
    type: ActionTypes.LOAD_TRUCK_PROFILE_FAILURE,
    payload: error
  };
}

// update
export function updateTruckProfileRequest(data) {
  return {
    type: ActionTypes.UPDATE_TRUCK_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateTruckProfileSuccess(truckProfile) {
  return {
    type: ActionTypes.updateTruckProfileSuccess,
    payload: { truckProfile },
  };
}

export function updateTruckProfileFailure(error) {
  return {
    type: ActionTypes.UPDATE_TRUCK_PROFILE_FAILTURE,
    payload: error,
  };
}

// delete
export function deleteTruckProfileRequest(truck_id) {
  return {
    type: ActionTypes.DELETE_TRUCK_PROFILE_REQUEST,
    payload: { truck_id },
  };
}

export function deleteTruckProfileSuccess(truck_id) {
  return {
    type: ActionTypes.DELETE_TRUCK_PROFILE_SUCCESS,
    payload: { truck_id },
  };
}

export function deleteTruckProfileFailure(error) {
  return {
    type: ActionTypes.DELETE_TRUCK_PROFILE_FAILURE,
    payload: error,
  };
}
