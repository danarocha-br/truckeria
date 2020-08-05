import React from 'react';
import StoryRouter from 'storybook-react-router';

import SignIn from './index';
import SignUp from '../SignUp';
import Forgot from '../ForgotPassword';

export default {
  title: 'Pages/Auth',
  decorators: [StoryRouter()],
};

export const Login = () => <SignIn />;

export const ForgotPassword = () => <Forgot />;

export const Register = () => <SignUp />;
