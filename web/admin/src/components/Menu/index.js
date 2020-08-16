import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded } from 'react-redux-firebase';
import { FiCalendar, FiPercent, FiTruck, FiGrid } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';
import { Container, List, Profile } from './styles';

import NavItem from './NavItem';
import ProfileImage from '../../assets/sign-in-background.png';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';

const Menu = () => {
  const theme = useContext(ThemeContext);
  const firebase = useFirebase();
  let history = useHistory();

  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);

  const handleSignOut = useCallback(async () => {
    try {
      await firebase.logout();
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Logo className="logo" />
      <List>
        <NavItem
          title="overview"
          icon={FiTruck}
          to="/dashboard"
          isLoading={!isLoaded(auth)}
        />
        <NavItem
          title="schedule"
          icon={FiCalendar}
          to="/schedule"
          isLoading={!isLoaded(auth)}
        />
        <NavItem
          title="menu"
          icon={FiGrid}
          to="/menu"
          isLoading={!isLoaded(auth)}
        />
        <NavItem
          title="discounts"
          icon={FiPercent}
          to="/discounts"
          isLoading={!isLoaded(auth)}
        />
      </List>

      <Profile>
        {!isLoaded(auth) ? (
          <SkeletonTheme
            color={theme.colors.shade}
            highlightColor={theme.colors.tabbar}
          >
            <Skeleton circle={true} height={35} width={35} />
          </SkeletonTheme>
        ) : (
          <img
            src={profile.photoURL ? profile.photoURL : ProfileImage}
            alt="foodtruck"
          />
        )}
        <div>
          {!isLoaded(auth) ? (
            ''
          ) : (
            <Link to="/profile">{profile.displayName}</Link>
          )}
          <Link to="/login" onClick={handleSignOut}>
            {!isLoaded(auth) ? '' : 'Log out'}
          </Link>
        </div>
      </Profile>
    </Container>
  );
};

Menu.propTypes = {
  isLoading: PropTypes.bool,
};

export default Menu;
