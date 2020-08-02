import React from 'react';
import { ThemeProvider } from 'styled-components';

import dark from "../styles/tokens/dark";
import GlobalStyle from "../styles/global";
import Button from "../components/Button";
import AuthLayout from "../pages/_layouts/auth";

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle />
        <AuthLayout>
            <h1>Test</h1>
            <Button></Button>
        </AuthLayout>
      </ThemeProvider>
  );
}

export default App;
