import React from 'react';
import styles from '@sambego/storybook-styles';
import { FiTruck } from 'react-icons/fi';
import StoryRouter from 'storybook-react-router';

import NavItem from './index';
import colors from '../../../styles/tokens/colors';

export default {
  title: 'Navigation/NavItem',
  component: NavItem,
  decorators: [
    styles({
      alignItems: 'center',
      padding: '30px',
      backgroundColor: colors.gray700,
    }),
    StoryRouter(),
  ],
};

export const MenuNavItem = (args) => {
  return (
    <ul>
      <NavItem {...args} />
      <NavItem title="This is a really long title right here" icon={FiTruck} />
    </ul>
  );
};

MenuNavItem.args = {
  isActive: true,
  isLoading: false,
  title: 'Overview',
  icon: FiTruck,
  to: '/',
};
