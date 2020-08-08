import React from 'react';
import styles from '@sambego/storybook-styles';
import { FiPieChart } from 'react-icons/fi';

import Overview from './index';

export default {
  title: 'Lists/Overview',
  component: Overview,
  decorators: [
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      width: 300,
    }),
  ],
};

export const Default = (args) => {
  return <Overview key="1" {...args} icon={FiPieChart} />;
};

Default.args = {
  icon: FiPieChart,
  title: '20',
  label: 'Total Items',
  isLoading: false,
};
