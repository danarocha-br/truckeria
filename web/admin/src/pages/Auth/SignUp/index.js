import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedContainer, Content, Background } from '../styles';
import AuthLayout from '../../_layouts/auth';
import { isLoaded } from 'react-redux-firebase';

import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';
import Link from '../../../components/Link';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/Errors/ErrorMessage';

import {
  signUpRequest,
  googleSignInRequest,
} from '../../../store/modules/auth/actions';

const RegistrationSchema = Yup.object().shape({
  displayName: Yup.string()
    .required('Please insert your full name.')
    .min(3, 'Name must have at least 3 characters.'),
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('Please insert an email.'),
  password: Yup.string()
    .min(6, 'Password must contain minimum of 6 caracters.')
    .required('You need to insert a password.'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const authError = useSelector((state) => state.firebase.authError);

  const handleSignUp = useCallback(
    async (values) => {
      try {
        await dispatch(signUpRequest(values));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, signUpRequest]
  );

  const handleGoogleSignUp = useCallback(async () => {
    await dispatch(googleSignInRequest());
  });

  const initialValues = { displayName: '', email: '', password: '' };

  return (
    <AuthLayout>
      <Background />

      <AnimatedContainer>
        <span className="link">
          <Link label="I have an account" to="/login"></Link>
        </span>

        <Content>
          <Logo className="logo" />
          <h1>Welcome back!</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={RegistrationSchema}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            <Form>
              <TextInput
                icon={AiOutlineUser}
                name="displayName"
                type="text"
                label="Your full name"
                disabled={!isLoaded(auth)}
              />
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

              <Button label="Create my account" isLoading={!isLoaded(auth)} />
              <Button
                label="Sign Up With Google"
                type="button"
                secondary
                onClick={handleGoogleSignUp}
                isLoading={!isLoaded(auth)}
              />
            </Form>
          </Formik>
          <p className="disclaimer">
            By signing up, I agree to Truckeria's{' '}
            <RouterLink to="/terms-and-conditions">
              Terms & Conditions
            </RouterLink>{' '}
            and <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>.
          </p>
        </Content>
      </AnimatedContainer>
    </AuthLayout>
  );
};

export default SignUp;
