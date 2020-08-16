import React from 'react';
import styles from '@sambego/storybook-styles';
import StoryRouter from 'storybook-react-router';

import ErrorMessage from './index';

export default {
  title: 'Errors/Message',
  component: ErrorMessage,
  decorators: [
    StoryRouter(),
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
    }),
  ],
};

export const Default = (args) => {
  return <ErrorMessage message="Hello" type="form" {...args} />;
};

Default.args = {
  message: 'The email address is already in use by another account.',
  type: 'form',
};
