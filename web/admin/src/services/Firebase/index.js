import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import ReduxSagaFirebase from 'redux-saga-firebase';

import config from './firebaseConfig';

const firebaseConfig = firebase.initializeApp({
  ...config,
});
// Initialize Firebase
export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseConfig);

export default firebase;
