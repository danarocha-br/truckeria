import React from 'react';
import StoryRouter from 'storybook-react-router';

import SignUp from './index';

export default {
  title: 'Pages/Auth',
  decorators: [StoryRouter()],
};

export const Register = () => <SignUp />;
