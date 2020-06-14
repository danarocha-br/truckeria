import React from 'react';
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { auth, signInWithGoogle } from '../../api/utils';

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
      {/* <Switch onChange={toggleTheme} checked={title === 'light'} /> */}
      <AnimatedContainer>
        <Content>
          <h2 className="text-4xl">Logo</h2>
          <h1>Login</h1>

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
                  type="text"
                  label="Your e-mail"
                />
                <TextInput
                  icon={AiOutlineLock}
                  name="password"
                  type="password"
                  label="Your password"
                />

                <Button label="Sign In" />
                <Button
                  label="Sign In With Google"
                  type="button"
                  onClick={signInWithGoogle}
                />

                <Link to="/forgot-password">Forgot my password</Link>
              </Form>
            )}
          />

          <Link to="/signup">Register</Link>
        </Content>
      </AnimatedContainer>

      <Background />
    </Container>
  );
};

export default SignIn;
