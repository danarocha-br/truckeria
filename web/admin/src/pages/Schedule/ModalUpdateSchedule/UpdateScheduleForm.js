import React, {useEffect, useState} from 'react';
import { Form, useFormikContext } from 'formik';
import { FiMapPin  } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Row from '~/components/Form/Row';
import DateInput from '~/components/DateInput';
import Select from '~/components/Select';
import Button from '~/components/Button';

const UpdateScheduleForm = () => {

  const { values, isValid } = useFormikContext();
  const [stateInitials, setStateInitials] = useState([])
  const [cities, setCities] = useState([])

  const isLoading = useSelector(state => state.schedules.loading);

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
      <DateInput icon={FiMapPin} name='address' label='Address' />

      <Row>
        <Select
          id="state"
          name="state"
          placeholder="Select State"
          options={stateInitials &&
            stateInitials.map((state) => {
              return { key: state, value: state, label: state };
          })}
          isLoading={isLoading}
        />
        <Select
          id="city"
          name="city"
          placeholder="Select City"
          options={cities &&
            cities.map((city) => {
              return { key: city, value: city, label: city };
            })}
            isLoading={isLoading}
        />
      </Row>

      <h3 className='text-gray-900 font-bold pt-4'>When does it start?</h3>
      <Row>
        <DateInput  name="date_start" label="Date" type="date" isLoading={isLoading}/>

        <DateInput  name="time_start" label="Time" type='time' isLoading={isLoading}/>
      </Row>

      <h3 className='text-gray-900 font-bold pt-4'>When does it end?</h3>
      <Row>
        <DateInput  name="date_end" label="Date" type="date" isLoading={isLoading}/>

        <DateInput  name="time_end" label="Time" type='time' isLoading={isLoading}/>
      </Row>

      <Button
        type='submit'
        label="Save Schedule"
        onClick={() => 'clicked'}
        isLoading={isLoading}
        disabled={!(isValid)}
        />
      </Form>
    );
}

export default UpdateScheduleForm;
