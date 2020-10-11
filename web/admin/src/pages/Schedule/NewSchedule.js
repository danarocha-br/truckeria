import React, {useState, useCallback} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Modal from '~/components/Modal';
import Form from './NewScheduleForm';

import { createScheduleRequest } from "~/store/modules/schedules/actions";

const ScheduleSchema = Yup.object().shape({
  address: Yup.string().required('Please insert a valid address.'),
  city: Yup.string().required('City is required.'),
  state: Yup.string().required('State is required.'),
  date_start: Yup.date().required('Please choose a date.'),
  time_start: Yup.string().required('Please pick a time.'),
  date_end: Yup.date().required('Please choose a date.'),
  time_end: Yup.string().required('Please pick a time.'),
});

const NewSchedule = ({ isOpen, toggleOpen, id }) => {

  const initialValues = {
    address: '',
    city: '',
    state: '',
    date_start: '',
    date_end: '',
    time_start: '',
    time_end: '',
  };

  const [formValues, setformValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit = useCallback((values) => {
     dispatch(createScheduleRequest({values, truck_id: id}))
  }, [dispatch, id]);


  return (
    <Modal isOpen={isOpen} toggleOpen={toggleOpen} title="Add new Schedule">
      <Formik
        initialValues={formValues}
        validationSchema={ScheduleSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
        >
          {({ values }) => {
            setTimeout(() => setformValues(values), 0);
            return <Form />;
          }}
        </Formik>

    </Modal>
  );
};

export default NewSchedule;
