import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineLock } from 'react-icons/ai';
import { withRouter, useHistory, useLocation } from 'react-router-dom';

import { Content, AnimatedContainer } from '../styles';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import Link from '~/components/Link';
import { ReactComponent as Logo } from '~/assets/truckeria-logo.svg';
import ErrorMessage from '~/components/Errors/ErrorMessage';
import api from '~/services/api';

const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a valid password.'),
  password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.')
});

const ResetPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(null);

  const history = useHistory();
  const location = useLocation()

  const initialValues = { password: '', password_confirmation: '' };

  const handleSubmit = useCallback(async (values) => {
    const { password, password_confirmation, } = values;
    const token = location.search.replace('?token=', '')

    if (!token) {
      throw new Error()
    }

    try {
      setLoading(true)
      await api.post('/password/reset-password', {
        password,
        password_confirmation,
        token
      })

      history.push('/login');

    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [location.search, history]);

  return (
    <AnimatedContainer>
      <Content>
        <Logo className="logo" />
        <h1 className="mt-8">Reset your Password</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
          render={({isSubmitting, isValid, dirty}) => (
            <Form>
              <p>user email</p>
              <TextInput
                icon={AiOutlineLock}
                name="password"
                type="password"
                label="Your new password"
                disabled={isSubmitting}
              />
              <TextInput
                icon={AiOutlineLock}
                name="password_confirmation"
                type="password"
                label="Confirm your new password"
                disabled={isSubmitting}
              />

              {hasError && <ErrorMessage message={hasError.message} />}

              <Button label="recover password" isLoading={isLoading} disabled={!(isValid && dirty)} />

              <Link label="Back to Login" to="/login">
                Back to Login
              </Link>
            </Form>
          )}
        />

      </Content>
    </AnimatedContainer>
  );
};

export default withRouter(ResetPassword);
