import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FiCalendar, FiTruck } from 'react-icons/fi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { BiFoodMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';
import { toast } from 'react-toastify';

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

  const truck_id = truckProfiles && truckProfiles[0].id;

  const handleSignOut = useCallback(async () => {
    try {
      dispatch(signOutRequest());
    } catch (error) {
      toast.error('An error occurred, please try again.')
    }
  }, [dispatch]);

  return (
    <Container>
      <Link to='/dashboard'>
        <Logo className="logo" />
      </Link>
      <List>
        <NavItem
          title="Dasboard"
          icon={HiOutlineViewGrid}
          to="/dashboard"
          isLoading={isLoading}
        />
        <NavItem
          title="Truck Profile"
          icon={FiTruck}
          to={`/truck-profile/${truck_id}`}
          isLoading={isLoading}
        />
        <NavItem
          title="Schedules"
          icon={FiCalendar}
          to={`/schedule/${truck_id}`}
          isLoading={isLoading}
        />
        <NavItem
          title="Menus"
          icon={BiFoodMenu}
          to={`/menus/${truck_id}`}
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
