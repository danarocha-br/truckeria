import React from 'react';
import styles from '@sambego/storybook-styles';
import StoryRouter from 'storybook-react-router';

import Link from './index';
import colors from '../../styles/tokens/colors';

export default {
  title: 'Navigation/Link',
  component: Link,
  decorators: [
    StoryRouter(),
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
  return <Link label="hello" {...args} />;
};

Default.args = {
  label: 'Hello',
  to: '/',
};
