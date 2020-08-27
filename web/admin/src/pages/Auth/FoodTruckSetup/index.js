import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { AnimatedContainer } from './styles';
import Form from './Form';
import Preview from './Preview';
import AuthLayout from '../../_layouts/auth';

const FoodTruckSetup = () => {
  const SetupSchema = Yup.object().shape({
    truckName: Yup.string()
      .required('Please insert your food truck name.')
      .min(3, 'Name must have at least 3 characters.'),
    cuisine: Yup.array()
      .min(1, 'Select at least one cuisine type.')
      .of(
        Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .nullable()
      )
      .max(5, 'You can select up to 5 cuisines.')
      .required('Please select at least one cuisine type.'),
    files: Yup.array(),
    state: Yup.string().required('Please choose your state.'),
    city: Yup.string().required('Please choose your city.'),
  });

  const initialValues = {
    files: [],
    truckName: '',
    cuisine: [],
    state: '',
    city: '',
    phone: '',
    website: '',
    instagram: '',
    facebook: '',
  };

  const [formValues, setformValues] = useState(initialValues);

  const handleSubmit = (values) => {};

  return (
    <AuthLayout>
      <AnimatedContainer>
        <div>
          <h1>Your FoodTruck Info</h1>
          <p>Tell your customers as much as possibile about your food truck!</p>

          <Formik
            initialValues={initialValues}
            validationSchema={SetupSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values);
            }}
          >
            {({ values }) => {
              setTimeout(() => setformValues(values), 0);
              return <Form />;
            }}
          </Formik>
        </div>
      </AnimatedContainer>

      <Preview values={formValues} />
    </AuthLayout>
  );
};

export default FoodTruckSetup;
