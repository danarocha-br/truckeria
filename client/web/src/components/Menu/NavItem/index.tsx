import React from 'react';
import { Link } from 'react-router-dom';

import { Item } from './styles';

export interface MenuItemsProps {
  title: string;
  icon: React.ComponentType<{ size?: string; color?: string }>;
  to: string;
  isActive?: boolean;
}

const MenuItems: React.SFC<MenuItemsProps> = ({
  title,
  icon: Icon,
  to,
  isActive,
}) => {
  return (
    <Item isActive={isActive}>
      <Link to={to}>
        <Icon size="19" />

        {title}
      </Link>
    </Item>
  );
};

export default MenuItems;
