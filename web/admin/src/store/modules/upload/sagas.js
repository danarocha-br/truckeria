import { takeLatest, put, all } from 'redux-saga/effects';
import cuid from 'cuid';
import ActionTypes from './types';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* uploadTruckImage({ payload: { firebase, firestore }, file }) {
  const user = firebase.auth().currentUser;
  const imageName = cuid();
  const dbPath = 'truckprofile';
  const storagePath = `${user.uid}/user_images/foodtruck_profile`;

  try {
    yield put(signUpSuccess({ user: { email, displayName, createdAt, role } }));
  } catch (error) {
    yield put(signFailure(error));
  }
}

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle),
]);
