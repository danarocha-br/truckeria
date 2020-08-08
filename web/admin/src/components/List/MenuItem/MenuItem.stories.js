import React from 'react';
import styles from '@sambego/storybook-styles';

import MenuItem from './index';

export default {
  title: 'Lists/MenuItem',
  component: MenuItem,
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
  return <MenuItem key="1" {...args} />;
};

Default.args = {
  thumb: ' ',
  title: 'Salad Bowl',
  description: 'Asian salad with cryspy chicken, lettuce. etc.',
  price: '8.90',
  isActive: false,
  isLoading: false,
};
