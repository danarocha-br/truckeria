import React from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { AnimatedContainer, Content, Background } from '../styles';
import AuthLayout from '../../_layouts/auth';

import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';
import Link from '../../../components/Link';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';

import {
  googleSignInRequest,
  emailSignInRequest,
} from '../../../store/modules/auth/actions';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must contain minimum of 6 caracters.')
    .required('Password is required'),
});

const SignIn = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    return dispatch(googleSignInRequest());
  };

  const handleEmailSignIn = (values) => {
    return dispatch(emailSignInRequest(values));
  };

  const initialValues = { email: '', password: '' };

  return (
    <AuthLayout>
      <AnimatedContainer>
        <span className="link">
          <Link label="I dont have an account" to="/register"></Link>
        </span>

        <Content>
          <Logo className="logo" />
          <h1>Welcome back!</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values, actions) => {
              handleEmailSignIn(values);
              // actions.setSubmitting(false);
            }}
          >
            <Form>
              <TextInput
                icon={AiOutlineMail}
                name="email"
                type="email"
                label="Your e-mail"
              />
              <TextInput
                icon={AiOutlineLock}
                name="password"
                type="password"
                label="Your password"
              />

              <Button type="submit" label="Sign In" />

              <Button
                label="Sign In With Google"
                type="button"
                secondary
                onClick={handleGoogleSignIn}
              />

              <Link to="/forgot-password" label="Forgot my password" />
            </Form>
          </Formik>
        </Content>
      </AnimatedContainer>

      <Background />
    </AuthLayout>
  );
};

export default SignIn;
