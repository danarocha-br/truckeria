import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import { withRouter, useHistory } from 'react-router-dom';

import { Content, AnimatedContainer } from '../styles';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import Link from '~/components/Link';
import { ReactComponent as Logo } from '~/assets/truckeria-logo.svg';
import ErrorMessage from '~/components/Errors/ErrorMessage';
import api from '~/services/api';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
});

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(null);

  const history = useHistory();

  const initialValues = { email: '' };

  const handleSubmit = useCallback(async (values) => {
    const { email } = values;

    try {
      setLoading(true)
      await api.post('/password/forgot-password', {
        email
      })
      history.push('/login');
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [history,]);

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
            actions.setSubmitting(false);
          }}
          render={({isValid, dirty}) => (
            <Form>
              <TextInput
                icon={AiOutlineMail}
                name="email"
                type="email"
                label="Your e-mail"
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

export default withRouter(ForgotPassword);
