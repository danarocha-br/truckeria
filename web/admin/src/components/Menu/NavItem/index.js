import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Item } from './styles';

const NavItem = ({ title, icon: Icon, to, isLoading }) => {
  const theme = useContext(ThemeContext);

  return (
    <Item>
      {isLoading ? (
        <SkeletonTheme
          color={theme.colors.shade}
          highlightColor={theme.colors.tabbar}
        >
          <Skeleton width={160} />
        </SkeletonTheme>
      ) : (
        <NavLink to={to} activeClassName="active">
          <Icon size="19" />
          {title}
        </NavLink>
      )}
    </Item>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default NavItem;
