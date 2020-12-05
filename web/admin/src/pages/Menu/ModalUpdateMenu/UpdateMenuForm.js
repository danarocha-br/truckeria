import React from 'react';
import { Form, useFormikContext } from 'formik';
import { FiMapPin  } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import DateInput from '~/components/DateInput';
import Button from '~/components/Button';
import  Upload  from '~/components/Upload';

const UpdateScheduleForm = () => {

  const isLoading = useSelector(state => state.menus.loading);

  const { values, setFieldValue, isSubmitting, isValid } = useFormikContext();

  return (
    <Form>
      <Upload
        values={values}
        valueField="files"
        setFieldValue={setFieldValue}
        />
      <DateInput icon={FiMapPin} name='title' label='Food Title' isLoading={isLoading} />
      <DateInput icon={FiMapPin} name='description' label='Food Description' isLoading={isLoading}/>
      <DateInput icon={FiMapPin} name='price' label='Food Price' isLoading={isLoading}/>
      <DateInput icon={FiMapPin} name='type' label='Type' isLoading={isLoading}/>

      <h3 className='text-gray-900 font-bold pt-4'>Add any extra options (vegan, vegaterian, etc.)</h3>
      <DateInput icon={FiMapPin} name='options' label='Add Options' isLoading={isLoading}/>

      <Button
        type='submit'
        label="UpdateMenu Item"
        onClick={() => 'clicked'}
        isLoading={isSubmitting}
        // disabled={!(isValid)}
        />
      </Form>
    );
}

export default UpdateScheduleForm;
