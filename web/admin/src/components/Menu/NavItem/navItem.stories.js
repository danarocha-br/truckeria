import React from 'react';
import styles from '@sambego/storybook-styles';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { FiCalendar, FiTruck } from 'react-icons/fi';
import StoryRouter from 'storybook-react-router';

import NavItem from './index';
import colors from '../../../styles/tokens/colors';

export default {
  title: 'Navigation/NavItem',
  component: NavItem,
  decorators: [
    withKnobs,
    styles({
      backgroundColor: colors.gray500,
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      padding: '30px',
    }),
    StoryRouter(),
  ],
};

export const MenuNavItem = () => {
  return (
    <ul>
      <NavItem
        isActive={boolean('isActive', true)}
        title={text('Title', 'Overview')}
        icon={FiTruck}
        to="/"
      />
      <NavItem title={text('Title', 'Schedules')} icon={FiCalendar} to="/" />
      <NavItem
        title="This is a really long title right here"
        icon={FiCalendar}
        to="/"
      />
    </ul>
  );
};
