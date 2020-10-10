import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { AnimatedContainer, Content, Background } from '../styles';
import AuthLayout from '~/pages/_layouts/auth';

import { ReactComponent as Logo } from '~/assets/truckeria-logo.svg';
import Link from '~/components/Link';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import ErrorMessage from '~/components/Errors/ErrorMessage';

import { emailSignInRequest } from '~/store/modules/auth/actions';

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

  const authError = useSelector((state) => state.auth.error);

  const handleEmailSignIn = useCallback(
    async ({ email, password }) => {
      await dispatch(emailSignInRequest(email, password));
    },
    [dispatch]
  );

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
              actions.setSubmitting(false);
            }}
          >
            {({ dirty, isSubmitting }) => {
              return (
                <Form>
                  <TextInput
                    icon={AiOutlineMail}
                    name="email"
                    type="email"
                    label="Your e-mail"
                    disabled={isSubmitting}
                  />
                  <TextInput
                    icon={AiOutlineLock}
                    name="password"
                    type="password"
                    label="Your password"
                    disabled={isSubmitting}
                  />

                  {authError && <ErrorMessage message={authError[0].message} />}

                  <Button
                    type="submit"
                    label="Sign In"
                    isLoading={isSubmitting}
                    disabled={!dirty}
                  />
                  <Link to="/forgot-password" label="Forgot my password" />
                </Form>
              );
            }}
          </Formik>
        </Content>
      </AnimatedContainer>

      <Background />
    </AuthLayout>
  );
};

export default SignIn;
