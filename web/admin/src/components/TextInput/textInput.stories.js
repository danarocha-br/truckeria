import React from 'react';
import * as Yup from 'yup';
import styles from '@sambego/storybook-styles';
import { FiMail } from 'react-icons/fi';
import withFormik from 'storybook-formik';

import TextInput from './index';

export default {
  title: 'Form/TextInput',
  component: TextInput,
  decorators: [
    styles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
    }),
  ],
};
const validationSample = Yup.object().shape({
  email: Yup.string()
    .email('Please enter your email address in the format: name@domain.com')
    .required('Please enter your email.'),
  name: Yup.string(),
});

export const WithIcon = (args) => {
  return (
    <div className="flex flex-col">
      <p className="text-center mb-3">With Icon</p>
      <TextInput {...args} label="Your e-mail" icon={FiMail} />
    </div>
  );
};

export const Default = (args) => {
  return (
    <div className="flex flex-col">
      <p className="text-center mb-3">Text Only</p>
      <TextInput {...args} id="name" name="name" label="Your Name" />
    </div>
  );
};

WithIcon.args = {
  name: 'email',
  id: 'email',
  label: 'email',
  type: 'email',
  label: 'Your e-mail',
  icon: FiMail,
  disabled: false,
  loading: false,
  readOnly: false,
  isLight: false,
};

WithIcon.story = {
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

Default.story = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        name: '',
      },
      validationSchema: validationSample,
    },
  },
};
