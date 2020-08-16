import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import config from './firebaseConfig';

const firebaseConfig = {
  ...config,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
