import { takeLatest, all, call, put } from 'redux-saga/effects';

import { googleProvider, reduxSagaFirebase } from "../../../services/utils";
import { ActionTypes } from "./types";
import { signFailure, signInSuccess,signOutSuccess } from "./actions";
import history from "../../../services/history";

function* getSnapshotFromUserAuth(userAuth) {
  try {

    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();

    yield put(
      signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    history.push('/schedule');

  } catch (error) {
    yield put(signFailure(error));
  }
}

function* createUserProfileDocument(userAuth, additionalData) {
    if(!userAuth) return;

    const userRef = yield call(reduxSagaFirebase.firestore.getDocument, `users/${userAuth.uid}`);
    const snapShot = userRef.get();

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      // Create user in document
      try {
        yield call(
          reduxSagaFirebase.firestore.setDocument,
          `users/${userAuth.uid}`,
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        );

      } catch (error) {
        console.log('Erro creating the user', error.message)
      }
    }
    return userRef;
}

function* onSignInWithGoogle() {
  try {
    const { user } = yield call(reduxSagaFirebase.auth.signInWithPopup, googleProvider);
    yield getSnapshotFromUserAuth(user);
  }
  catch(error) {
    yield put(signFailure(error));
    console.log(error)
  }
}

function* onSignInWithEmail({ payload }) {

  const { email, password } = payload;

  try {
   const { user } = yield call(reduxSagaFirebase.auth.signInWithEmailAndPassword, email, password);

   yield put(signInSuccess({
     id: user.uid,
     name: user.displayName,
     avatar: user.photoURL,
     email: user.email,
     phone: user.phoneNumber
    }));

   history.push('/schedule');

  } catch (error) {
    yield put(signFailure(error));
  }
}

function * onSignOutStart() {
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put(signOutSuccess());
    history.push('/login');

  } catch (error) {
    yield put(signFailure(error));
  }
}

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_START, onSignInWithGoogle),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_START, onSignInWithEmail),
  takeLatest(ActionTypes.SIGN_OUT_START, onSignOutStart),
]);



