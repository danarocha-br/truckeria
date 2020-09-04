import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import auth from './auth/reducer';
import truckProfile from './truckProfile/reducer';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth,
  truckProfile,
});
