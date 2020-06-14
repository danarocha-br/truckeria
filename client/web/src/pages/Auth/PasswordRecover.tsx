import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { Container, Content, Background, AnimatedContainer } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { auth } from '../../services/utils';

interface FormValues {
  email: string;
}

type PasswordRecoverProps = RouteComponentProps;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
});

const PasswordRecover: React.SFC<PasswordRecoverProps> = ({ history }) => {
  const initialValues: FormValues = { email: '' };
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (values: FormValues) => {
    const { email } = values;

    const config = {
      url: 'http://localhost:3000/login',
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          history.push('/login');
        })
        .catch(() => {
          const err = ['E-mail not found. Please try again.'];
          setErrors(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <AnimatedContainer>
        <Content>
          <h2 className="text-4xl">Logo</h2>
          <h1>Recover your Password</h1>

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

                <Button label="recover password" />

                <Link to="/login">Back to Login</Link>
              </Form>
            )}
          />
          {errors?.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}
        </Content>
      </AnimatedContainer>
    </Container>
  );
};

export default withRouter(PasswordRecover);
