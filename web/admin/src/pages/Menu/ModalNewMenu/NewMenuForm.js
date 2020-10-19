import React  from 'react';
import { Form, useFormikContext } from 'formik';
import { FiMapPin  } from 'react-icons/fi';

import TextInput from '~/components/TextInput';
// import Select from '~/components/Select';
import Button from '~/components/Button';

const NewMenuForm = ( ) => {

  const { values, isSubmitting, touched, isValid } = useFormikContext();

  return (
    <Form>
      <TextInput icon={FiMapPin} name='title' label='Food Title' />
      <TextInput icon={FiMapPin} name='description' label='Food Description' />
      <TextInput icon={FiMapPin} name='price' label='Food Price' />
      <TextInput icon={FiMapPin} name='type' label='Type' />

      <h3 className='text-gray-900 font-bold pt-4'>Add any extra options (vegan, vegaterian, etc.)</h3>
      <TextInput icon={FiMapPin} name='options' label='Add Options' />

      <Button
        type='submit'
        label="Add New Menu Item"
        onClick={() => 'clicked'}
        isLoading={isSubmitting}
        disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
        />
      </Form>
    );
}

export default NewMenuForm;
