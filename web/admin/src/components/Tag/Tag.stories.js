import React from 'react';
import styles from '@sambego/storybook-styles';

import Tag from './index';

export default {
  title: 'Tag',
  component: Tag,
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
  return <Tag {...args} />;
};

Default.args = {
  label: 'Vegan-friendly',
  isLoading: false,
};
