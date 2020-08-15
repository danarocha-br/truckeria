import firebase from './index';

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// GOOGLE SIGNIN
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
