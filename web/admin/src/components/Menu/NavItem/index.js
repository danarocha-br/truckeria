import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import { Item } from './styles';

const NavItem = ({
  title,
  icon: Icon,
  to,
  isActive,
}) => {
  return (
    <Item isActive={isActive}>
      <a to={to}>
        <Icon size="19" />
        {title}
      </a>
    </Item>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default NavItem;
