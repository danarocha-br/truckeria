import React from 'react';
import styles from '@sambego/storybook-styles';

import Title from './index';
import colors from '../../styles/tokens/colors';

export default {
  title: 'Title',
  component: Title,
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
  return <Title title="hello" {...args} />;
};

Default.args = {
  title: 'Hello',
  total: 20
};
