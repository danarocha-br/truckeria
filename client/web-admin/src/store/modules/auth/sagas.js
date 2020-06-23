import { takeLatest, all, call, put } from 'redux-saga/effects';

import { auth, googleProvider, reduxSagaFirebase, createUserProfileDocument } from "../../../services/utils";
import { ActionTypes } from "./types";
import { googleSignInSuccess, signFailure, emailSignInSuccess } from "./actions";


function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);

    // const userRef = yield call(createUserProfileDocument, currentUser);
    // const userSnapshot = yield userRef.get();

    yield put(
      googleSignInSuccess({user}));
  }
  catch(error) {
    yield put(signFailure(error));
  }
}


function* signInWithEmail({ payload }) {

  const { email, password } = payload;

  try {
   const { user } = yield call(reduxSagaFirebase.auth.signInWithEmailAndPassword, email, password);
  //  const userRef = yield call(createUserProfileDocument, user);
  //  const userSnapshot = yield userRef.get();

  const userRef = yield call(reduxSagaFirebase.firestore.getDocument, `users/${user.uid}`);
//     const snapShot = userRef.get();

  console.log(userRef);


  //  yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
   yield put(emailSignInSuccess({id: user.uid, ...user}));

  } catch (error) {
    yield put(signFailure(error));
  }
}

// function* createUserProfileDocument(userAuth, additionalData) {
//   try {
//     if(!userAuth) return;

//     const userRef = yield call(reduxSagaFirebase.firestore.getDocument, `users/${userAuth.uid}`);
//     const snapShot = userRef.get();

//     if (!snapShot.exists) {
//       const {displayName, email} = userAuth;
//       const createdAt = new Date();

//       // Create user in document
//       try {
//         yield call(
//           reduxSagaFirebase.firestore.setDocument,
//           `users/${userAuth.uid}`,
//           {
//             displayName,
//             email,
//             createdAt,
//             ...additionalData
//           }
//         );

//       } catch (error) {
//         console.log('Erro creating the user', error.message)
//       }
//     }
//     return userRef;

//     // yield put(loginSuccess(data))
//   }
//   catch(error) {
//     // yield put(loginFailure(error))
//   }
// }

export default all([
  takeLatest(ActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle),
  takeLatest(ActionTypes.EMAIL_SIGN_IN_START, signInWithEmail),
  // takeLatest(ActionTypes.CREATE_USER, createUserProfileDocument),
]);



