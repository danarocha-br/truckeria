import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import { Content, AnimatedContainer } from '../styles';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Link from '../../../components/Link';
import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';
import ErrorMessage from '../../../components/Errors/ErrorMessage';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
});

const ForgotPassword = () => {
  const authError = useSelector((state) => state.firebase.authError);
  const firebase = useFirebase();
  let history = useHistory();

  const initialValues = { email: '' };

  const handleSubmit = useCallback(async (values) => {
    const { email } = values;

    const config = {
      url: 'http://localhost:3000/login',
    };

    try {
      await firebase.resetPassword(email, config);
      history.push('/login');
    } catch (error) {}
  }, []);

  return (
    <AnimatedContainer>
      <Content>
        <Logo className="logo" />
        <h1 className="mt-8">Recover your Password</h1>

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

              {authError && <ErrorMessage message={authError.message} />}

              <Button label="recover password" />

              <Link label="Back to Login" to="/login">
                Back to Login
              </Link>
            </Form>
          )}
        />
        {/* {errors?.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )} */}
      </Content>
    </AnimatedContainer>
  );
};

export default withRouter(ForgotPassword);
