import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiPercent, FiTruck, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Container, List, Profile } from './styles';
import NavItem from './NavItem';
import ProfileImage from '../../assets/sign-in-background.png';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';

const Menu = ({ isLoading }) => {
  const theme = useContext(ThemeContext);

  const handleSignOut = () => {
    // return dispatch(signOutStart());
  };

  return (
    <Container>
      <Logo className="logo" />
      <List>
        <NavItem
          isActive
          title="overview"
          icon={FiTruck}
          to="/"
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
          <img src={ProfileImage} alt="foodtruck" />
        )}
        <div>
          {isLoading ? '' : <Link to="/profile">Dana Rocha</Link>}
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
