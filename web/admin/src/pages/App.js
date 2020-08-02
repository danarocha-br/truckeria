import React from 'react';
import { ThemeProvider } from 'styled-components';

import dark from "../styles/tokens/dark";
import GlobalStyle from "../styles/global";
import Button from "../components/Button";

function App() {
  return (
    <GlobalStyle>
      <ThemeProvider theme={dark}>
          <Button></Button>
      </ThemeProvider>
    </GlobalStyle>
  );
}

export default App;
