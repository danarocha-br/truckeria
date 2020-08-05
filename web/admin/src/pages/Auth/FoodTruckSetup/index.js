import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FiFacebook, FiInstagram, FiGlobe, FiPhone } from 'react-icons/fi';

import { AnimatedContainer, PreviewContainer } from './styles';
import AuthLayout from '../../_layouts/auth';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Row from '../../../components/Form/Row';

const SetupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please insert your food truck name.')
    .min(3, 'Name must have at least 3 characters.'),
  cuisine: Yup.array()
    .max(5, 'You can select up to 5 cuisines.')
    .required('Please select at least one cuisine type.'),
});

const FoodTruckSetup = () => {
  return (
    <AuthLayout>
      <AnimatedContainer>
        <div>
          <h1>Your food truck's info</h1>
          <p>Tell your customers as much as possibile about your food truck!</p>

          <Formik
            // initialValues={initialValues}
            validationSchema={SetupSchema}
            onSubmit={(values, actions) => {
              // handleSubmit(values);
              // actions.setSubmitting(false);
            }}
            render={() => (
              <Form>
                <>
                  <h2>Basic Info</h2>
                  <div style={{ marginBottom: 20, textAlign: 'center' }}>
                    Upload Your FoodTruck Cover Image
                  </div>
                  <TextInput name="name" label="Your Food Truck Name" />
                  <TextInput name="cuisine" label="Select Cuisine Type" />
                  <Row>
                    <TextInput name="state" label="Select State" />
                    <TextInput name="city" label="Select City" />
                  </Row>

                  <h2>Contact Info</h2>
                  <TextInput
                    name="phone"
                    label="Your Phone Number"
                    icon={FiPhone}
                  />
                  <TextInput
                    name="website"
                    label="Your Website"
                    icon={FiGlobe}
                  />
                  <Row>
                    <TextInput
                      name="instagram"
                      label="Instagram ID"
                      icon={FiInstagram}
                    />
                    <TextInput
                      name="facebook"
                      label="Facebook ID"
                      icon={FiFacebook}
                    />
                  </Row>

                  <Button type="submit" label="Continue" />
                </>
              </Form>
            )}
          />
        </div>
      </AnimatedContainer>

      <PreviewContainer>
        <h1>test</h1>
      </PreviewContainer>
    </AuthLayout>
  );
};

export default FoodTruckSetup;
