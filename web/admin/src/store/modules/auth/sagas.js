import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';
import ActionTypes from './types';
import { reduxSagaFirebase } from '../../../services/Firebase';
import {
  auth,
  googleProvider,
  firestore,
} from '../../../services/Firebase/utils';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

function* createUserProfileDocument({ userAuth, additionalData = {} }) {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = yield call(
    reduxSagaFirebase.firestore.getDocument,
    `users/${userAuth.uid}`
  );

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      yield call(
        reduxSagaFirebase.firestore.setDocument,
        `users/${userAuth.uid}`,
        {
          displayName,
          email,
          createdAt,
          ...additionalData,
        }
      );
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    yield call(createUserProfileDocument, {
      userAuth: user,
      additionalData,
    });

    const userSnapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `users/${user.uid}`
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    history.push('/schedule');
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, { user });
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

function* signInWithEmail({ payload }) {
  const { email, password } = payload;

  try {
    const { user } = yield call(
      reduxSagaFirebase.auth.signInWithEmailAndPassword,
      email,
      password
    );
    // yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signFailure(error));
    console.log(error);
  }
}

function* signUpWithEmail({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      reduxSagaFirebase.auth.createUserWithEmailAndPassword,
      email,
      password
    );

    yield put(signUpSuccess({ user, additionalData: { displayName } }));

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
