import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Item } from './styles';

const NavItem = ({ title, icon: Icon, to, isActive, isLoading }) => {
  const theme = useContext(ThemeContext);

  return (
    <Item isActive={isActive}>
      {isLoading ? (
        <SkeletonTheme
          color={theme.colors.shade}
          highlightColor={theme.colors.tabbar}
        >
          <Skeleton width={160} />
        </SkeletonTheme>
      ) : (
        <Link to={to}>
          <Icon size="19" />
          {title}
        </Link>
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
