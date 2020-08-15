import { ActionTypes } from './types';

export function signInRequest(emailAndPassword) {
  return {
    type: ActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
  };
}
