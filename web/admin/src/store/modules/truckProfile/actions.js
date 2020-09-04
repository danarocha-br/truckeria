import ActionTypes from './types';

export function truckProfileRequest(values) {
  return {
    type: ActionTypes.TRUCK_PROFILE_REQUEST,
    payload: values,
  };
}

export function truckProfileSuccess(values) {
  return {
    type: ActionTypes.CREATE_TRUCK_PROFILE_SUCCESS,
    payload: values,
  };
}

export function truckProfileError(error) {
  return {
    type: ActionTypes.TRUCK_PROFILE_FAILTURE,
    payload: error,
  };
}
