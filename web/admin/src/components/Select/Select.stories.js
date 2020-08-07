import React from 'react';
import * as Yup from 'yup';
import styles from '@sambego/storybook-styles';
import withFormik from 'storybook-formik';

import Select from './index';

const foodOptions = [
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Burger', label: 'Burger' },
  { value: 'Salad', label: 'Salad' },
  { value: 'Vegan-friendly', label: 'Vegan-friendly' },
];

export default {
  title: 'Form/Select',
  component: Select,
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
  food: Yup.string().required('Please choose at least one food type.'),
});

export const Default = (args) => {
  return (
    <div className="flex flex-col">
      <p className="text-center mb-3">Single Option</p>
      <Select {...args} id="food" name="food" />
    </div>
  );
};

Default.args = {
  placeholder: 'Select food type',
  options: foodOptions,
  isLoading: false,
  isMulti: false,
};

Default.story = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        food: [],
      },
      validationSchema: validationSample,
    },
  },
};

export const Multi = (args) => {
  return (
    <div className="flex flex-col">
      <p className="text-center mb-3">Mutiple Option</p>
      <Select {...args} id="food" name="food" isMulti />
    </div>
  );
};

Multi.args = {
  placeholder: 'Select food type',
  options: foodOptions,
  isLoading: false,
  isMulti: false,
};

Multi.story = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        food: [],
      },
      validationSchema: validationSample,
    },
  },
};
