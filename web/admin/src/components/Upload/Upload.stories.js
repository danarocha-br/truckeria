import React from 'react';
import * as Yup from 'yup';
import styles from '@sambego/storybook-styles';
import withFormik from 'storybook-formik';

import Upload from './index';

export default {
  title: 'Form/Upload',
  component: Upload,
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
  files: Yup.array().required('Please upload one picture.'),
});

export const Default = (args) => {
  return (
    <div className="flex flex-col">
      <p className="text-center mb-3">Single Option</p>
      <Upload {...args} id="files" name="files" />
    </div>
  );
};

Default.args = {};

Default.story = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        files: [],
      },
      validationSchema: validationSample,
    },
  },
};
