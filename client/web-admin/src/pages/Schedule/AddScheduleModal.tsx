import React, {useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FiMapPin, FiClock, FiCalendar } from "react-icons/fi";

import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRow from "../../components/Form/Row";

interface FormValues {
  address: string;
  city: string;
  state: string;
  time: string;
  date: string;
}

const ScheduleSchema = Yup.object().shape({
  address: Yup.string()
    .required('Please insert a valid address.'),
  city: Yup.string()
    .required('City is required.'),
  state: Yup.string()
    .required('State is required.'),
  date: Yup.date()
    .required('Please choose a date.'),
  time: Yup.string()
    .required('Please pick a time.'),
});

const ScheduleModal: React.FC<FormValues> = () => {

  const initialValues: FormValues = { address: '', city: '', state: '', time: '', date: '' };

  const handleSubmit = async (values: FormValues) => {
    const { address, city, state, date, time } = values;

    try {
      // await auth.signInWithEmailAndPassword(address, city, state, date, time);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <Formik
      initialValues={initialValues}
      validationSchema={ScheduleSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.setSubmitting(false);
      }}
      render={() => (
        <Form>

          <TextInput
            icon={FiMapPin}
            name="address"
            label="Address"
          />
          <FormRow>
            <TextInput
              name="city"
              label="City"
            />
            <TextInput
              name="state"
              label="State"
            />
          </FormRow>

          <FormRow>
            <TextInput
            icon={FiCalendar}
              name="date"
              label="Date"
            />
            <TextInput
            icon={FiClock}
              name="time"
              label="Time"
            />
          </FormRow>

          <Button label="Save" />
       </Form>
      )}
    />
  </Modal> );
}

export default ScheduleModal;
