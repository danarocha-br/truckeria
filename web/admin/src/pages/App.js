import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '../config/ReactotronConfig';

import Routes from '../routes';
import history from '../services/history';
import dark from '../styles/tokens/dark';
import GlobalStyle from '../styles/global';

import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={dark}>
          <GlobalStyle />
          <Routes history={history} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
