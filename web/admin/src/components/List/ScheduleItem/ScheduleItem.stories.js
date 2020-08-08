import React from 'react';
import styles from '@sambego/storybook-styles';

import ScheduleItem from './index';
import colors from '../../../styles/tokens/colors';

export default {
  title: 'Lists/ScheduleItem',
  component: ScheduleItem,
  decorators: [
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      backgroundColor: colors.gray700,
    }),
  ],
};

export const Default = (args) => {
  return <ScheduleItem date="hello" {...args} />;
};

Default.args = {
  date: '9:00-18:00, Monday, June 09 2020',
  address: '767 5th Ave, New York',
};
