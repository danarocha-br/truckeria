import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { isLoaded } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

import { AnimatedContainer, Content, Background } from '../styles';
import AuthLayout from '../../_layouts/auth';

import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';
import Link from '../../../components/Link';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/Errors/ErrorMessage';

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
  const auth = useSelector((state) => state.firebase.auth);
  const authError = useSelector((state) => state.firebase.authError);
  let history = useHistory();

  const handleGoogleSignIn = useCallback(async () => {
    await dispatch(googleSignInRequest());
    history.push('/');
  });

  const handleEmailSignIn = useCallback(
    async (values) => {
      try {
        await dispatch(emailSignInRequest(values));
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, emailSignInRequest]
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
              // actions.setSubmitting(false);
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
                    disabled={!isLoaded(auth)}
                  />
                  <TextInput
                    icon={AiOutlineLock}
                    name="password"
                    type="password"
                    label="Your password"
                    disabled={!isLoaded(auth)}
                  />

                  {authError && <ErrorMessage message={authError.message} />}

                  <Button
                    type="submit"
                    label="Sign In"
                    isLoading={isSubmitting}
                    disabled={!dirty}
                  />

                  <Button
                    label="Sign In With Google"
                    type="button"
                    secondary
                    onClick={handleGoogleSignIn}
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
