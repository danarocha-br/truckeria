import React, {useEffect, useState} from 'react';
import { Form, useFormikContext } from 'formik';
import { FiMapPin  } from 'react-icons/fi';
import axios from 'axios';

import Row from '~/components/Form/Row';
import TextInput from '~/components/TextInput';
import DateInput from '~/components/DateInput';
import Select from '~/components/Select';
import Button from '~/components/Button';

// const Map = ReactMapboxGl({
//   accessToken: process.env.REACT_APP_MAPBOX_KEY,
// });

const NewScheduleForm = ( ) => {

  const { values, isSubmitting, dirty, isValid } = useFormikContext();
  const [stateInitials, setStateInitials] = useState([])
  const [cities, setCities] = useState([])
  // const [address, setAddress] = useState('')

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

    // const searchPlaces = useCallback((searchText) => {
    //   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    //   axios.get(`${url}/${searchText}/.json?types=address&access_token=/${process.env.REACT_APP_MAPBOX_KEY}`)
    //   .then(response => {
    //     const address = response.data.map(address => address)
    //     setAddress(address)
    //   })
    // }, [searchText])


  return (
    <Form>

        <TextInput icon={FiMapPin} name='address' label='Address' />

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

        <h3 className='text-gray-900 font-bold pt-4'>When does it start?</h3>
        <Row>
          <DateInput  name="date_start" label="Date" type="date" />

          <DateInput  name="time_start" label="Time" type='time' />
        </Row>

        <h3 className='text-gray-900 font-bold pt-4'>When does it end?</h3>
        <Row>
          <DateInput  name="date_end" label="Date" type="date" />

          <DateInput  name="time_end" label="Time" type='time' />
        </Row>

        <Button
          type='submit'
          label="Add New Schedule"
          onClick={() => 'clicked'}
          isLoading={isSubmitting}
          disabled={!(isValid && dirty)}
          />
      </Form>

    );
}

export default NewScheduleForm;
