import React from 'react';
import StoryRouter from 'storybook-react-router';

import SignIn from './index';

export default {
  title: 'Pages/Auth',
  decorators: [StoryRouter()],
};

export const Login = () => <SignIn />;
