import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { auth, createUserProfileDocument } from '../services/utils.js';
import '../config/ReactotronConfig.js';
import store from '../store';

import '../styles/main.css';
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
import usePersistedState from '../utils/usePersistedState';
import { UserData, setCurrentUser } from '../store/modules/auth/actions';

import Routes from '../routes';

const App: React.SFC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  // const currentUser = useSelector<UserData, UserData['currentUser']>(
  //   (state) => state.currentUser,
  // );

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme.title, setTheme]);

  // currentUser
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef?.onSnapshot((snapShot) => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            }),
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => unsubscribeFromAuth();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes toggleTheme={toggleTheme} />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
