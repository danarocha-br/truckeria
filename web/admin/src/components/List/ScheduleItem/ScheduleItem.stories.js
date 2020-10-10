import React from 'react';
import styles from '@sambego/storybook-styles';

import ScheduleItem from './index';

export default {
  title: 'Lists/ScheduleItem',
  component: ScheduleItem,
  decorators: [
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
    }),
  ],
};

export const Default = (args) => {
  return <ScheduleItem date="9:00-18:00, Monday, June 09 2020" key="1" {...args} />;
};

Default.args = {
  date: '9:00-18:00, Monday, June 09 2020',
  day: '05 Nov',
  address: '767 5th Ave, New York',
  startsIn: '5 days',
  isActive: false,
  isLoading: false,
};
