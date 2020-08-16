import { combineReducers } from 'redux';
import { firebaseReducer, firestoreReducer } from 'react-redux-firebase';

import auth from './auth/reducer';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth,
});
