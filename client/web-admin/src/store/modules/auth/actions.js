import { ActionTypes } from './types';


export function setCurrentUser(currentUser) {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: { currentUser },
  };
}

export function createUserRequest(userAuth, additionalData) {
  return {
    type: ActionTypes.CREATE_USER,
    payload: { userAuth, additionalData },
  };
}

export function signInSuccess(currentUser) {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    payload: { currentUser },
  };
}

export function signFailure() {
  return {
    type: ActionTypes.SIGN_FAILURE,
  };
}

export function signOut() {
  return {
    type: ActionTypes.SIGN_OUT,
  };
}
