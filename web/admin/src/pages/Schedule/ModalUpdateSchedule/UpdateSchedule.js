import React, { useState, useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Modal from '~/components/Modal';
import Form from './UpdateScheduleForm';
import { formatISO9075, parseISO } from 'date-fns';

import { updateScheduleRequest } from "~/store/modules/schedules/actions";

const ScheduleSchema = Yup.object().shape({
  address: Yup.string().required('Please insert a valid address.'),
  city: Yup.string().required('City is required.'),
  state: Yup.string().required('State is required.'),
  date_start: Yup.date().required('Please choose a date.'),
  time_start: Yup.string().required('Please pick a time.'),
  date_end: Yup.date().required('Please choose a date.'),
  time_end: Yup.string().required('Please pick a time.'),
});

const UpdateSchedule = ({ schedule }) => {

  const parsedDate = parseISO(schedule.date_start);

  const formatedStartDate = useMemo(() => {
    return formatISO9075(parsedDate, { representation: 'date' })
  }, [schedule.date_start])

  const formatedEndDate = useMemo(() => {
    const parsedDate = parseISO(schedule.date_end)
    return formatISO9075(parsedDate, { representation: 'date' })
  }, [schedule.date_end])

  const formatedStartTime = useMemo(() => {
    return formatISO9075(parsedDate, { representation: 'time' })
  }, [schedule.date_start])

  const formatedEndTime = useMemo(() => {
    const parsedTime = parseISO(schedule.date_end)
    return formatISO9075(parsedTime, { representation: 'time' })
  }, [schedule.date_end])

  const initialValues = {
   ...schedule,
   date_start: formatedStartDate,
   date_end: formatedEndDate,
   time_start: formatedStartTime,
   time_end: formatedEndTime,
  };

  const [formValues, setformValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit =  useCallback((values) => {
    dispatch(updateScheduleRequest(values))
  }, [dispatch]);


  return (
    <Modal title={`Edit Schedule Details:`} >
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

export default UpdateSchedule;
