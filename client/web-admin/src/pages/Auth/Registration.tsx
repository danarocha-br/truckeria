import React from 'react';

import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import * as Yup from 'yup';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { auth, createUserProfileDocument } from '../../services/utils.js';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';

interface RegistrationProps {}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please insert your full name.')
    .min(3, 'Name must have at least 3 characters.'),
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('Please insert an email.'),
  password: Yup.string()
    .min(6, 'Password must contain minimum of 6 caracters.')
    .required('You need to insert a password.'),
});

const Registration: React.SFC = () => {
  const initialValues: FormValues = { name: '', email: '', password: '' };

  const handleSubmit = async (values: FormValues) => {
    const { email, password, name } = values;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await createUserProfileDocument(user, { displayName: name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Background />

      <AnimatedContainer>
        <span>
          <Link to="/login" label="Login" />
        </span>
        <Content>
          <Logo className="logo" />
          <h1>Welcome back!</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={RegistrationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            render={() => (
              <Form>
                <TextInput
                  icon={AiOutlineUser}
                  name="name"
                  type="text"
                  label="Your full name"
                />
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

                <Button label="Create my account" />
              </Form>
            )}
          />
        </Content>
      </AnimatedContainer>
    </Container>
  );
};

export default Registration;
