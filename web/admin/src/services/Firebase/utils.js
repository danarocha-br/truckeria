import firebase from './index';

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// GOOGLE SIGNIN
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// USER DOCUMENT
export const createUserProfileDocument = async ({
  userAuth,
  additionalData,
}) => {
  if (!userAuth) return;

  const { uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const userRoles = ['admin'];

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        userRoles,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
