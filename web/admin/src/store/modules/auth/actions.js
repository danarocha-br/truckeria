import ActionTypes from './types';

// export function googleSignInRequest() {
//   return {
//     type: ActionTypes.GOOGLE_SIGN_IN_REQUEST,
//   };
// }

export function emailSignInRequest(email, password) {
  return {
    type: ActionTypes.EMAIL_SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signFailure(error) {
  return {
    type: ActionTypes.SIGN_FAILURE,
    payload: error,
  };
}

export function signUpRequest(userCredentials) {
  return {
    type: ActionTypes.SIGN_UP_REQUEST,
    payload: userCredentials,
  };
}

export function signUpSuccess({ user, additionalData }) {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData },
  };
}
