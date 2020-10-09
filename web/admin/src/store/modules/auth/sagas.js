import { takeLatest, put, all, call } from 'redux-saga/effects';

import ActionTypes from './types';
import { signInSuccess, signFailure, signUpSuccess } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.roles !== 'admin') {
      console.tron.error('User is not an admin.');
    }

    yield put(signInSuccess(token, user));
    history.push('/');
  } catch (error) {
    yield put(signFailure(error));
  }
}

// export function* signUpWithEmail({
//   payload: { displayName, email, password },
// }) {
//   const role = ['admin'];

//   try {
//     yield put(signUpSuccess({ user: { email, displayName, role } }));
//   } catch (error) {
//     yield put(signFailure(error));
//   }
// }

export default all([
  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  // takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
]);
