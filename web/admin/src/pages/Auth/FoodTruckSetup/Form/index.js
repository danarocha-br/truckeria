import React from 'react';
import { Form, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

import { FiFacebook, FiInstagram, FiGlobe, FiPhone } from 'react-icons/fi';

import TextInput from '../../../../components/TextInput';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import Row from '../../../../components/Form/Row';
import Upload from '../../../../components/Upload';
import { States } from '../../../../services/states';

const FormSetup = () => {
  const { values, setFieldValue, dirty, isSubmitting } = useFormikContext();

  useFirestoreConnect([{ collection: 'cuisines' }]);
  const cuisines = useSelector((state) => state.firestore.ordered.cuisines);

  const foodOptions =
    cuisines &&
    cuisines.map((cuisine) => {
      return { value: cuisine.title, label: cuisine.title };
    });

  return (
    <Form>
      <>
        <h2>Basic Info</h2>
        <Upload
          values={values}
          valueField="files"
          setFieldValue={setFieldValue}
        ></Upload>
        <TextInput
          id="truckName"
          name="truckName"
          label="Your Food Truck Name"
        />
        <Select
          id="cuisine"
          name="cuisine"
          placeholder="Select Cuisine Type"
          setFieldValue={setFieldValue}
          isMulti
          options={foodOptions ? foodOptions : []}
          isLoading={!isLoaded(cuisines)}
        />
        <Row>
          <Select
            id="state"
            name="state"
            placeholder="Select State"
            options={States}
          />
          <TextInput id="city" name="city" label="City" />
        </Row>

        <h2>Contact Info</h2>
        <TextInput
          id="phone"
          name="phone"
          label="Your Phone Number"
          type="number"
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
            disabled={!dirty || isSubmitting}
          />
        </div>
      </>
    </Form>
  );
};

export default FormSetup;
