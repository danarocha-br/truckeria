import React from 'react';
import { useDispatch } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';
import Link from '../../components/Link';
import { googleSignInStart, emailSignInStart } from "../../store/modules/auth/actions";

interface FormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must contain minimum of 6 caracters.')
    .required('Password is required'),
});

const SignIn: React.SFC = () => {
  const dispatch = useDispatch();

  const initialValues: FormValues = { email: '', password: '' };

  const handleGoogleSignIn = () => {
   return dispatch(googleSignInStart());
   console.log('clicked')
  }

  const handleSubmit = (values: FormValues) => {
     dispatch(emailSignInStart(values));
  };

  return (
    <Container>
      <AnimatedContainer>
        <span className='link'>
          <Link to="/register" label="Create an account" />
        </span>
        <Content>
          <Logo className="logo" />
          <h1>Welcome back!</h1>

          {/* <p>Fill in your details to login:</p> */}

          <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              // actions.setSubmitting(false);
            }}
            render={() => (
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

                <Button type='submit' label="Sign In" />
{/*
                <Button
                  label="Sign In With Google"
                  type="button"
                  onClick={handleGoogleSignIn}
                /> */}
                <Link to="/forgot-password" label="Forgot my password" />
              </Form>
            )}
          />
        </Content>
      </AnimatedContainer>

      <Background />
    </Container>
  );
};

export default SignIn;
