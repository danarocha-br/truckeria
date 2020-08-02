import React from 'react';
import { ThemeProvider } from 'styled-components';

import dark from "../styles/tokens/dark";
import GlobalStyle from "../styles/global";
import Button from "../components/Button";
import SignIn from "../pages/Auth/SignIn";

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle />
        <SignIn>

        </SignIn>
      </ThemeProvider>
  );
}

export default App;
