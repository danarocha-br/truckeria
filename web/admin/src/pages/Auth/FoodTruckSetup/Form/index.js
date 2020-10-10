import React, {useEffect, useState} from 'react';
import { Form, useFormikContext } from 'formik';
import { FiFacebook, FiInstagram, FiGlobe, FiPhone } from 'react-icons/fi';
import axios from 'axios';

import TextInput from '~/components/TextInput';
import Select from '~/components/Select';
import Button from '~/components/Button';
import Row from '~/components/Form/Row';
import Upload from '~/components/Upload';
import { Cuisines } from '~/constants/cuisines';

const FormSetup = () => {
  const { values, setFieldValue, dirty, isSubmitting } = useFormikContext();
  const [stateInitials, setStateInitials] = useState([])
  const [cities, setCities] = useState([])

   const foodOptions =
    Cuisines &&
    Cuisines.map((cuisine) => {
      return { value: cuisine.value, label: cuisine.label };
    });

    // get state list
    useEffect(() => {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const stateInitials = response.data.map(initial => initial.sigla)
        setStateInitials(stateInitials)
      })
    }, [])

    // get city list
    useEffect(() => {
      // load cities when state changes
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${values.state}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)
        setCities(cityNames)
      })
    }, [values.state])

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
          id="name"
          name="name"
          label="Your Food Truck Name"
        />
        <TextInput
          id="description"
          name="description"
          label="Description"
        />
        <Select
          id="cuisines"
          name="cuisines"
          placeholder="Select Cuisine Type"
          setFieldValue={setFieldValue}
          isMulti
          options={foodOptions ? foodOptions : []}
          // isLoading={isLoaded}
        />
        {/* <Select
          id="payment_methods"
          name="payment_methods"
          placeholder="Select Accepted Payment Methods"
          setFieldValue={setFieldValue}
          isMulti
          options={[]}
          // isLoading={isLoaded}
        /> */}
        <Row>
          <Select
            id="state"
            name="state"
            placeholder="Select State"
            options={stateInitials &&
              stateInitials.map((state) => {
                return { key: state, value: state, label: state };
              })}
          />
          <Select
            id="city"
            name="city"
            placeholder="Select City"
            options={cities &&
              cities.map((city) => {
                return { key: city, value: city, label: city };
              })}
          />
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
          id="email"
          name="email"
          label="Food-truck e-mail"
          type="email"
          icon={FiPhone}
        />
        <TextInput
          id="web"
          name="web"
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
            isLoading={isSubmitting}
            disabled={!dirty}
          />
        </div>
      </>
    </Form>
  );
};

export default FormSetup;
