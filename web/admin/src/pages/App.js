import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '../config/ReactotronConfig';

import ModalManager from '~/components/Modal/ModalManager';
import Routes from '../routes';
import history from '../services/history';
import dark from '../styles/tokens/dark';
import GlobalStyle from '../styles/global';

import { store, persistor } from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={dark}>
            <GlobalStyle />
            <ModalManager />
            <Routes history={history} />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
