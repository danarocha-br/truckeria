import { ActionTypes } from './types';

export interface UserData {
  currentUser: string | null;
}

export interface SignInRequestAction {
  type: ActionTypes.auth_SET_CURRENT_USER;
  payload: string;
}

export function signInRequest(currentUser: UserData) {
  return {
    type: ActionTypes.auth_SET_CURRENT_USER,
    payload: currentUser,
  };
}

export function signInSuccess() {
  return {
    type: ActionTypes.auth_SIGN_IN_SUCCESS,
    payload: '',
  };
}

export function signFailure() {
  return {
    type: ActionTypes.auth_SIGN_FAILURE,
  };
}
