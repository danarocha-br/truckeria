import { takeLatest, all, call, put } from 'redux-saga/effects';

import firebase, {reduxSagaFirebase} from "../../../services/utils";
import { ActionTypes } from "./types";
import { createUserRequest, setCurrentUser, signFailure, signInSuccess, signOut } from "./actions";

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

// function* signInWithGoogle() {
//   try {
//     const user = yield call(reduxSagaFirebase.auth.signInWithPopup, googleProvider)
//     yield put(signInSuccess(data))
//   }
//   catch(error) {
//     yield put(signFailure(error))
//   }
// }

function* createUserProfileDocument(userAuth, additionalData) {
  try {
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
          {  displayName,
            email,
            createdAt,
            ...additionalData }
        );

      } catch (error) {
        console.log('Erro creating the user', error.message)
      }
    }
    return userRef;

    // yield put(loginSuccess(data))
  }
  catch(error) {
    // yield put(loginFailure(error))
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_USER,createUserProfileDocument),
]);



