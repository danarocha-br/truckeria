import React from 'react';
import StoryRouter from 'storybook-react-router';

import ForgotPassword from './index';

export default {
  title: 'Pages/Auth',
  decorators: [StoryRouter()],
};

export const ForgotPassword = () => <ForgotPassword />;
