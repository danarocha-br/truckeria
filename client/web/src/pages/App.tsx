import React from 'react';

import '../styles/main.css';
import GlobalStyle from '../styles/global';

import SignIn from './Auth/SignIn';

const App: React.SFC = () => {
  return (
    <>
      <SignIn></SignIn>
      <GlobalStyle />
    </>
  );
};

export default App;
