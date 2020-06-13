import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';

import '../styles/main.css';
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

import SignIn from './Auth/SignIn';

const App: React.SFC = () => {
  const [theme, setTheme] = useState(dark);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme.title]);

  return (
    <ThemeProvider theme={dark}>
      <SignIn />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
