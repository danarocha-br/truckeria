import React from 'react';
import { Link } from 'react-router-dom';

import { Item } from './styles';

export interface MenuItemsProps {
  title: string;
  icon: React.ComponentType<{ size?: string; color?: string }>;
  to: string;
  active?: boolean;
}

const MenuItems: React.SFC<MenuItemsProps> = ({
  title,
  icon: Icon,
  to,
  active,
}) => {
  return (
    <Item>
      <Link to={to}>
        <Icon size="19" />

        {title}
      </Link>
    </Item>
  );
};

export default MenuItems;
