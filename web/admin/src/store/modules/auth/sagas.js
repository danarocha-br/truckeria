import { takeLatest, put, all } from 'redux-saga/effects';

import ActionTypes from './types';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signInWithGoogle() {
  try {
  } catch (error) {
    yield put(signFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
  } catch (error) {
    yield put(signFailure(error));
  }
}

export function* signUpWithEmail({
  payload: { displayName, email, password },
}) {
  const createdAt = new Date();
  const role = ['admin'];

  try {
    yield put(signUpSuccess({ user: { email, displayName, createdAt, role } }));
  } catch (error) {
    yield put(signFailure(error));
  }
}

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
]);
