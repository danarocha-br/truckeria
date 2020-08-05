import React from 'react';
import StoryRouter from 'storybook-react-router';

import SignIn from './index';
import SignUp from '../SignUp';
import ForgotPassword from '../ForgotPassword';

export default {
  title: 'Pages/Auth',
  decorators: [StoryRouter()],
};

export const Login = () => <SignIn />;

// export const ForgotPassword = () => <ForgotPassword />;

export const Register = () => <SignUp />;
