import { takeLatest, put, all, call } from 'redux-saga/effects';

import ActionTypes from './types';
import { signSuccess, signFailure } from './actions';
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

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signSuccess(token, user));
    history.push('/');
  } catch (error) {
    yield put(signFailure(error));
  }
}

export function* signUpWithEmail({ payload: { email, name, password } }) {
  try {
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    const { token, user } = response.data;

    history.push('/');

    yield put(signSuccess(token, user));
  } catch (error) {
    yield put(signFailure(error));
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
]);
