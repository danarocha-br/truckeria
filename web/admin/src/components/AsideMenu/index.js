import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FiCalendar, FiPercent, FiTruck, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';
import { Container, List, Profile } from './styles';

import NavItem from './NavItem';
import ProfileImage from '~/assets/sign-in-background.png';
import { ReactComponent as Logo } from '~/assets/truckeria-logo.svg';
import { signOutRequest } from '~/store/modules/auth/actions';

const AsideMenu = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);
  const truckProfiles = useSelector((state) => state.truckProfile.list);
  const isLoading = useSelector((state) => state.auth.loading);

  const truck_id = truckProfiles && truckProfiles[0].id

  const handleSignOut = useCallback(async () => {
    try {
      dispatch(signOutRequest());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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
          to={`/schedule/${truck_id}`}
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
            src={!user.avatar_url ? ProfileImage : user.avatar_url}
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

AsideMenu.propTypes = {
  isLoading: PropTypes.bool,
};

export default AsideMenu;
