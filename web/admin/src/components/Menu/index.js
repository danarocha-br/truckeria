import React from 'react';
import { FiCalendar, FiPercent, FiTruck, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, List, Profile } from './styles';
import NavItem from './NavItem';
import ProfileImage from '../../assets/sign-in-background.png';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';

const Menu = () => {
  const handleSignOut = () => {
    // return dispatch(signOutStart());
  };

  return (
    <Container>
      <Logo className="logo" />
      <List>
        <NavItem isActive title="overview" icon={FiTruck} to="/" />
        <NavItem title="schedule" icon={FiCalendar} to="/schedule" />
        <NavItem title="menu" icon={FiGrid} to="/menu" />
        <NavItem title="discounts" icon={FiPercent} to="/discounts" />
      </List>

      <Profile>
        <img src={ProfileImage} alt="foodtruck" />
        <div>
          <Link to="/profile">Dana Rocha</Link>
          <Link to="/login" onClick={handleSignOut}>
            Log out
          </Link>
        </div>
      </Profile>
    </Container>
  );
};

export default Menu;
