import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { FiFacebook, FiInstagram, FiGlobe, FiPhone } from 'react-icons/fi';

import TextInput from '../../../../components/TextInput';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import Row from '../../../../components/Form/Row';
import Upload from '../../../../components/Upload';

const SetupSchema = Yup.object().shape({
  truckName: Yup.string()
    .required('Please insert your food truck name.')
    .min(3, 'Name must have at least 3 characters.'),
  cuisine: Yup.array()
    .max(5, 'You can select up to 5 cuisines.')
    .required('Please select at least one cuisine type.'),
  files: Yup.array(),
  state: Yup.string().required('Please choose your state.'),
  city: Yup.string().required('Please choose your city.'),
});

const initialValues = {
  files: [],
  truckName: '',
  cuisine: '',
  state: '',
  city: '',
  phone: '',
  website: '',
  instagram: '',
  facebook: '',
};

const handleSubmit = (values) => {
  alert(
    JSON.stringify(
      {
        files: values.files.map((file) => ({
          fileName: file.name,
          type: file.type,
          size: `${file.size} bytes`,
        })),
      },
      null,
      2
    )
  );
};

const FormSetup = () => {
  useFirestoreConnect([{ collection: 'cuisines' }]);
  // const cuisines = useSelector((state) => state.firestore.cuisines);

  // console.log(cuisines);
  const foodOptions = [{ value: 'Mexican', label: 'Mexican' }];

  return (
    <Formik
      // initialValues={initialValues}
      validationSchema={SetupSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
      render={(values, setFieldValue) => (
        <Form onSubmit={handleSubmit}>
          <>
            <h2>Basic Info</h2>
            <Upload values={values} setFieldValue={setFieldValue}></Upload>
            <TextInput
              id="truckName"
              name="truckName"
              label="Your Food Truck Name"
            />
            <Select
              id="cuisine"
              name="cuisine"
              placeholder="Select Cuisine Type"
              isMulti
              options={foodOptions}
            />
            <Row>
              <Select id="state" name="state" placeholder="Select State" />
              <Select id="city" name="city" placeholder="Select City" />
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
};

export default FormSetup;
