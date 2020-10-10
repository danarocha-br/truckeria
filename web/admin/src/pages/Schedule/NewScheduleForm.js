import React, {useEffect, useState} from 'react';
import { Form, useFormikContext } from 'formik';
import {  FiClock, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
// import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

import Row from '~/components/Form/Row';
import TextInput from '~/components/TextInput';
import Select from '~/components/Select';
import Button from '~/components/Button';

const NewScheduleForm = ( ) => {

  const { values } = useFormikContext();
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

  // const handleAddressSelect = (value) => {}

  return (
    <Form>
        {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleAddressSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextInput
            id='address'
              name='address'
              label='Search Address'
              isLoading={loading}
              {...getInputProps({
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        </PlacesAutocomplete> */}

        <TextInput name='address' label='address' />

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

        <Row>
          <TextInput icon={FiCalendar} name="date" label="Date" />
          <TextInput icon={FiClock} name="time" label="Time" />
        </Row>

        <Button label="Save" />
      </Form>
    );
}

export default NewScheduleForm;
