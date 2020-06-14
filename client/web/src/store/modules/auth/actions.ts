import { ActionTypes } from './types';

export interface UserData {
  currentUser?: string | null | firebase.User;
  id?: string;
}

export interface setCurrentUser {
  type: ActionTypes.auth_SET_CURRENT_USER;
  payload: string;
}

export function setCurrentUser(currentUser: UserData) {
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
