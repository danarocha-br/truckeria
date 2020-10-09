import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
  let history = useHistory();

  const user = useSelector((state) => state.auth.currentUser);
  const auth = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.auth.loading);

  const handleSignOut = useCallback(async () => {
    try {
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <div>
        <Logo className="logo" />
      </div>
      <List>
        <NavItem
          title="overview"
          icon={FiTruck}
          to="/dashboard"
          isLoading={isLoading}
        />
        <NavItem
          title="schedule"
          icon={FiCalendar}
          to="/schedule"
          isLoading={isLoading}
        />
        <NavItem title="menu" icon={FiGrid} to="/menu" isLoading={isLoading} />
        <NavItem
          title="discounts"
          icon={FiPercent}
          to="/discounts"
          isLoading={isLoading}
        />
      </List>

      <Profile>
        {isLoading ? (
          <SkeletonTheme
            color={theme.colors.shade}
            highlightColor={theme.colors.tabbar}
          >
            <Skeleton circle={true} height={35} width={35} />
          </SkeletonTheme>
        ) : (
          <img
            src={user.avatar_url ? user.avatar_url : ProfileImage}
            alt="foodtruck"
          />
        )}
        <div>
          {isLoading ? '' : <Link to="/profile">{user.name}</Link>}
          <Link to="/login" onClick={handleSignOut}>
            {isLoading ? '' : 'Log out'}
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
