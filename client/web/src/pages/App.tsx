import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { Provider } from 'react-redux';
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

import Routes from '../routes';

export interface UserData {
  id?: string;
}
// interface FirebaseHookHandlers {
//   subscribe: () => void;
//   error: (error: Error) => void;
//   unsubscribe: () => void;
//   children?: ReactNode;
// }
const App: React.SFC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  const [currentUser, setUser] = useState<UserData | null | firebase.User>(
    null,
  );

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef?.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setUser(userAuth);
    });

    return unsubscribeFromAuth();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme.title, setTheme]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes currentUser={currentUser} toggleTheme={toggleTheme} />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
