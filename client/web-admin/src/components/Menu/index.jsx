import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { FiCalendar, FiPercent, FiTruck, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DefaultTheme } from 'styled-components';

import { Container, List, Profile } from './styles';
import NavItem from './NavItem';
import ProfileImage from '../../assets/sign-in-background.png';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';
import Switch from '../Switch';
import dark from '../../styles/themes/dark';
import light from '../../styles/themes/light';
import usePersistedState from '../../utils/usePersistedState';
import { signOutStart } from "../../store/modules/auth/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = usePersistedState('theme', dark);
  const user = useSelector(state => state.auth.currentUser);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme.title, setTheme]);

  const handleSignOut = () => {
    return dispatch(signOutStart());
   }

  return (
    <Container>
      <Switch onChange={toggleTheme} checked={theme.title === 'light'} />

      <Logo className="logo" />
      <List>
        <NavItem isActive title="overview" icon={FiTruck} to="/" />
        <NavItem title="schedule" icon={FiCalendar} to="/schedule" />
        <NavItem title="menu" icon={FiGrid} to="/menu" />
        <NavItem title="discounts" icon={FiPercent} to="/discounts" />
      </List>
      <Profile>
        <img src={user.avatar ? user.avatar : ProfileImage} alt="foodtruck" />
        <div>
          <Link to="/profile">{user.name}</Link>
          <Link to="/login" onClick={handleSignOut}>Log out</Link>
        </div>
      </Profile>
    </Container>
  );
};

export default Menu;
