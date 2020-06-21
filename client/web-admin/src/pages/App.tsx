import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import '../config/ReactotronConfig.js';
import store from '../store';

import '../styles/main.css';
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
import usePersistedState from '../utils/usePersistedState';
// import { setCurrentUser } from '../store/modules/auth/actions';
import ModalManager from '../components/Modal/ModalManager.jsx';

import Routes from '../routes';

const App: React.SFC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  // const currentUser = useSelector<UserData, UserData['currentUser']>(
  //   (state) => state.currentUser,
  // );

  // const toggleTheme = useCallback(() => {
  //   setTheme(theme.title === 'dark' ? light : dark);
  // }, [theme.title, setTheme]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <>
            {/* <ModalManager /> */}
            <Routes />
          </>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
