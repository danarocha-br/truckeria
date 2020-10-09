import ActionTypes from './types';

export function emailSignInRequest(email, password) {
  return {
    type: ActionTypes.EMAIL_SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signSuccess(token, user) {
  return {
    type: ActionTypes.SIGN_SUCCESS,
    payload: { token, user },
  };
}

export function signFailure(error) {
  return {
    type: ActionTypes.SIGN_FAILURE,
    payload: error,
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: ActionTypes.SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signOutRequest() {
  return {
    type: ActionTypes.SIGN_OUT_REQUEST,
  };
}
