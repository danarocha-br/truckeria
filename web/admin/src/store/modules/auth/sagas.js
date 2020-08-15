import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';
import { ActionTypes } from './types.ts';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from '../../../config/Firebase/utils';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    history.push('/schedule');
  } catch (error) {
    yield put(signFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

export function* signInWithEmail({ payload }) {
  const { email, password } = payload;

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

function* signUpWithEmail({ payload: { email, password, name } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(
      signUpSuccess({
        user,
        additionalData: { displayName: name },
      })
    );

    history.push('/schedule');
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
  takeLatest(ActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp),
]);
