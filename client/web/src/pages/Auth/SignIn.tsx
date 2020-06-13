import React from 'react';
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

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

  return (
    <Container>
      <Content>
        <h2 className="text-4xl">Logo</h2>
        <h1>Login</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
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

              <a href="">Forgot my password</a>
            </Form>
          )}
        />

        <a href="">Register</a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
