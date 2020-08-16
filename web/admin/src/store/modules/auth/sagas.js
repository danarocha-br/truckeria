import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';
import firebase from '../../../services/Firebase';
import ActionTypes from './types';
import {
  auth,
  googleProvider,
  firestore,
  createUserProfileDocument,
} from '../../../services/Firebase/utils';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(createUserProfileDocument, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* signUpWithEmail({
  payload: { displayName, email, password },
}) {
  try {
    firebase.createUser({ email, password });

    const createdAt = new Date();
    const role = 'admin';

    firebase.updateProfile({
      displayName: displayName,
      createdAt,
      role,
    });
    history.push('/schedule');
    yield put(signUpSuccess({ user: { email, displayName, createdAt, role } }));
  } catch (error) {
    yield put(signFailure(error));
  }
}

// function* createUserProfileDocument({ userAuth, additionalData = {} }) {
//   if (!userAuth) return;

//   const userRef = firestore.doc(`users/${userAuth.uid}`);

//   const snapShot = yield call(
//     reduxSagaFirebase.firestore.getDocument,
//     `users/${userAuth.uid}`
//   );

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();
//     try {
//       yield call(
//         reduxSagaFirebase.firestore.setDocument,
//         `users/${userAuth.uid}`,
//         {
//           displayName,
//           email,
//           createdAt,
//           ...additionalData,
//         }
//       );
//     } catch (error) {
//       console.log('error creating user', error.message);
//     }
//   }

//   return userRef;
// }

// function* getSnapshotFromUserAuth(user, additionalData = {}) {
//   try {
//     yield call(createUserProfileDocument, {
//       userAuth: user,
//       additionalData,
//     });

//     // const userSnapshot = yield call(
//     //   reduxSagaFirebase.firestore.getDocument,
//     //   `users/${user.uid}`
//     // );

//     const userRef = yield call(createUserProfileDocument, {
//       userAuth: user,
//       additionalData,
//     });
//     const userSnapshot = yield userRef.get();

//     yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

//     history.push('/schedule');
//   } catch (error) {
//     yield put(signFailure(error));
//     console.log(error);
//   }
// }

// export function* getSnapshotFromUserAuth(userAuth, additionalData) {
//   try {
//     const userRef = yield call(
//       createUserProfileDocument,
//       userAuth,
//       additionalData
//     );
//     const userSnapshot = yield userRef.get();
//     yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (error) {
//     yield put(signFailure(error));
//   }
// }

// function* signInWithGoogle() {
//   try {
//     const { user } = yield auth.signInWithPopup(googleProvider);
//     yield call(getSnapshotFromUserAuth, { user });
//   } catch (error) {
//     yield put(signFailure(error));
//     console.log(error);
//   }
// }

// function* signInWithEmail({ payload }) {
//   const { email, password } = payload;

//   try {
//     const { user } = yield call(
//       reduxSagaFirebase.auth.signInWithEmailAndPassword,
//       email,
//       password
//     );
//     // yield getSnapshotFromUserAuth(user);
//   } catch (error) {
//     yield put(signFailure(error));
//     console.log(error);
//   }
// }

// function* signUpWithEmail({ payload: { email, password, displayName } }) {
//   try {
//     const { user } = yield call(
//       reduxSagaFirebase.auth.createUserWithEmailAndPassword,
//       email,
//       password
//     );

//     yield put(signUpSuccess({ user, additionalData: { displayName } }));

//     history.push('/schedule');
//   } catch (error) {
//     yield put(signFailure(error));
//     console.log(error);
//   }
// }

// function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   yield getSnapshotFromUserAuth(user, additionalData);
// }

// export default all([
//   takeLatest(ActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle),
//   takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
//   takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
//   takeLatest(ActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp),
// ]);

export default all([
  //  takeLatest(ActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle),
  //  takeLatest(ActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUpWithEmail),
  //  takeLatest(ActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp),
]);
