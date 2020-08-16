import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import ReduxSagaFirebase from 'redux-saga-firebase';

import config from './firebaseConfig';

const firebaseConfig = {
  ...config,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
