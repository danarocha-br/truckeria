import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase';

import {firebaseConfig} from './firebase';

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export const reduxSagaFirebase = new ReduxSagaFirebase(db);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Auth
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.setCustomParameters({prompt: 'select_account'});
// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    // Create user in document
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Erro creating the user', error.message)
    }
  }

  return userRef;
}

export default firebase;




