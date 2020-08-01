import { takeLatest, all, call, put } from 'redux-saga/effects';

import { googleProvider, reduxSagaFirebase, createUserProfileDocument } from "../../../services/utils";
import { ActionTypes } from "./types";
import { signFailure, signInSuccess, signOutSuccess, signUpSuccess } from "./actions";
import history from "../../../services/history";

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {

    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();

    yield put(
      signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    history.push('/schedule');

  } catch (error) {
    yield put(signFailure(error));
  }
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
   yield getSnapshotFromUserAuth(user);

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

function* onSignOutStart() {
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put(signOutSuccess());
    history.push('/login');

  } catch (error) {
    yield put(signFailure(error));
  }
}

function* onSignUpStart({ payload: { email, password, name }}) {
  try {
    const { user } = yield call(reduxSagaFirebase.auth.createUserWithEmailAndPassword, email, password);

    yield put(signUpSuccess({
      user, additionalData: {name}
    }));

    yield createUserProfileDocument(user, { displayName: name });

    history.push('/schedule');

  } catch (error) {
    yield put(signFailure(error));
    console.log(error)
  }
}

// function* signInAfterSignUp({ payload: { user, additionalData }}) {
//   try {
//     yield getSnapshotFromUserAuth(user, additionalData);

//   } catch (error) {
//     yield put(signFailure(error));
//     console.log(error)
//   }
// }

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_START, onSignInWithGoogle),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_START, onSignInWithEmail),
  takeLatest(ActionTypes.SIGN_OUT_START, onSignOutStart),
  takeLatest(ActionTypes.SIGN_UP_START, onSignUpStart),
  // takeLatest(ActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp),
]);



