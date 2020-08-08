import React from 'react';
import styles from '@sambego/storybook-styles';

import Calendar from './index';

export default {
  title: 'Calendar',
  component: Calendar,
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
  return <Calendar {...args} />;
};

Default.args = {};
