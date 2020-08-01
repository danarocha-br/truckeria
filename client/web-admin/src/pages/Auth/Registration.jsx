import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from 'formik';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import * as Yup from 'yup';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { signUpStart } from '../../store/modules/auth/actions';
import { ReactComponent as Logo } from '../../assets/truckeria-logo.svg';


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

const Registration = () => {
  const dispatch = useDispatch();

  const authErrors = useSelector(state => state.auth.error);

  const initialValues= { name: '', email: '', password: '' };

  const handleSubmit = async (values) => {
    const { email, password, name } = values;
    return dispatch(signUpStart({ email, password, name }));
  };

  return (
    <Container>
      <Background />

      <AnimatedContainer>
        <span className='link'>
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

                {authErrors && <p>{authErrors}</p>}

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
