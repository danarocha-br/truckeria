import { takeLatest, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import ActionTypes from './types';
import { signSuccess, signFailure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    const isAdmin = user.roles.includes('admin');
    if (!isAdmin) {
      toast.error(`This user is not an admin.`);
      return;
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signSuccess(token, user));
    history.push('/');
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(signFailure(error));
  }
}

export function* signUpWithEmail({ payload: { name, email, password } }) {
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      roles: 'admin',
    });

    yield put(signSuccess());
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
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

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
  takeLatest(ActionTypes.SIGN_OUT_REQUEST, signOut),
]);
