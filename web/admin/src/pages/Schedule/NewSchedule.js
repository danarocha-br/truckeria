import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';

import Form from '../../components/Form';
import Row from '../../components/Form/Row';
import TextInput from '../../components/TextInput';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const ScheduleSchema = Yup.object().shape({
  address: Yup.string().required('Please insert a valid address.'),
  city: Yup.string().required('City is required.'),
  state: Yup.string().required('State is required.'),
  date: Yup.date().required('Please choose a date.'),
  time: Yup.string().required('Please pick a time.'),
});

const NewSchedule = ({ isOpen, toggleOpen }) => {
  const initialValues = {
    address: '',
    city: '',
    state: '',
    time: '',
    date: '',
  };

  const handleSubmit = async (values) => {
    const { address, city, state, date, time } = values;

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggleOpen={toggleOpen} title="Add new Schedule">
      <Formik
        initialValues={initialValues}
        validationSchema={ScheduleSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
        render={() => (
          <Form>
            <TextInput icon={FiMapPin} name="address" label="Address" />
            <Row>
              <TextInput name="city" label="City" />
              <TextInput name="state" label="State" />
            </Row>

            <Row>
              <TextInput icon={FiCalendar} name="date" label="Date" />
              <TextInput icon={FiClock} name="time" label="Time" />
            </Row>

            <Button label="Save" />
          </Form>
        )}
      />
    </Modal>
  );
};

export default NewSchedule;
