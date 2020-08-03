import React from 'react';
import * as Yup from 'yup';
import styles from '@sambego/storybook-styles';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { AiOutlineMail } from 'react-icons/fi';
import withFormik from 'storybook-formik';

import TextInput from './index';
import colors from '../../styles/tokens/colors';

export default {
  title: 'Form/TextInput',
  component: TextInput,
  decorators: [
    withKnobs,
    styles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      maxWidth: '300px',
    }),
  ],
};
const validationSample = Yup.object().shape({
  email: Yup.string()
    .email('Please enter your email address in the format: name@domain.com')
    .required('Please enter your email.'),
});

export const TextOnly = () => {
  return (
    <div>
      <p className="text-center">With Icon</p>
      <TextInput
        id="email"
        name="email"
        icon={AiOutlineMail}
        type="email"
        label="Your e-mail"
        disabled={boolean('Disabled', false)}
        loading={boolean('Loading', false)}
        readOnly={boolean('Readonly', false)}
      />
    </div>
  );
};

TextOnly.story = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        email: '',
      },
      validationSchema: validationSample,
    },
  },
};
