import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'firebase/auth';
import 'firebase/firestore';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';

import '../config/ReactotronConfig';
import firebase from '../services/Firebase';

import Routes from '../routes';
import history from '../services/history';
import dark from '../styles/tokens/dark';
import GlobalStyle from '../styles/global';

import { store, persistor } from '../store';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <ThemeProvider theme={dark}>
              <GlobalStyle />
              <Routes history={history} />
            </ThemeProvider>
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
