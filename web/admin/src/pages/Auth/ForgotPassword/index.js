import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';

import { Content, AnimatedContainer } from '../styles';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Link from '../../../components/Link';
import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid e-mail.')
    .required('E-mail is required'),
});

const ForgotPassword = ({ history }) => {
  const initialValues = { email: '' };
  // const [errors, setErrors] = useState<string[]>([]);

  // const handleSubmit = async (values: FormValues) => {
  //   const { email } = values;

  //   const config = {
  //     url: 'http://localhost:3000/login',
  //   };

  //   try {
  //     await auth
  //       .sendPasswordResetEmail(email, config)
  //       .then(() => {
  //         history.push('/login');
  //       })
  //       .catch(() => {
  //         const err = ['E-mail not found. Please try again.'];
  //         setErrors(err);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <AnimatedContainer>
      <Content>
        <Logo className="logo" />
        <h1 className="mt-8">Recover your Password</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            // handleSubmit(values);
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
