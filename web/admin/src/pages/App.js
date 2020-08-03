import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';
import history from '../services/history';
import dark from '../styles/tokens/dark';
import GlobalStyle from '../styles/global';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <GlobalStyle />
        <Routes history={history} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
