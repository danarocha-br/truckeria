import React, {useCallback, useState} from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import '../config/ReactotronConfig.js';
import store from '../store';

import '../styles/main.css';
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import usePersistedState from '../utils/usePersistedState';
import ModalManager from '../components/Modal/ModalManager.jsx';

import Routes from '../routes';

const App: React.SFC = () => {
  const [ theme, setTheme ] = useState<DefaultTheme>(dark);
  // const [ theme, setTheme ] = usePersistedState<DefaultTheme>('theme', dark);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <>
            <ModalManager />
            <Routes />
          </>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
