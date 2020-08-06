import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FiFacebook, FiInstagram, FiGlobe, FiPhone } from 'react-icons/fi';

import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import Row from '../../../../components/Form/Row';

const SetupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please insert your food truck name.')
    .min(3, 'Name must have at least 3 characters.'),
  cuisine: Yup.array()
    .max(5, 'You can select up to 5 cuisines.')
    .required('Please select at least one cuisine type.'),
});

function FormSetup() {
  return (
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
            <TextInput id="name" name="name" label="Your Food Truck Name" />
            <TextInput
              id="cuisine"
              name="cuisine"
              label="Select Cuisine Type"
            />
            <Row>
              <TextInput id="state" name="state" label="Select State" />
              <TextInput id="city" name="city" label="Select City" />
            </Row>

            <h2>Contact Info</h2>
            <TextInput
              id="phone"
              name="phone"
              label="Your Phone Number"
              icon={FiPhone}
            />
            <TextInput
              id="website"
              name="website"
              label="Your Website"
              icon={FiGlobe}
            />
            <Row>
              <TextInput
                id="instagram"
                name="instagram"
                label="Instagram ID"
                icon={FiInstagram}
              />
              <TextInput
                id="facebook"
                name="facebook"
                label="Facebook ID"
                icon={FiFacebook}
              />
            </Row>

            <div className="py-8">
              <Button
                type="submit"
                label="Continue"
                onClick={() => 'clicked'}
              />
            </div>
          </>
        </Form>
      )}
    />
  );
}

export default FormSetup;
