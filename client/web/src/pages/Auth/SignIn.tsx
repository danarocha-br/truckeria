import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { auth, signInWithGoogle } from '../../services/utils.js';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';

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
  const initialValues: FormValues = { email: '', password: '' };

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <AnimatedContainer>
        <span>
          <Link to="/register">Create an account</Link>
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

                <Button label="Sign In" />
                {/* <Button
                  label="Sign In With Google"
                  type="button"
                  onClick={signInWithGoogle}
                /> */}

                <Link to="/forgot-password">Forgot my password</Link>
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
