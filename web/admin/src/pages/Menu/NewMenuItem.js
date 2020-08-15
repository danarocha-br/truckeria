import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';

import Form from '../../components/Form';
import Row from '../../components/Form/Row';
import TextInput from '../../components/TextInput';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const MenuSchema = Yup.object().shape({
  image: Yup.string().required('Please insert a valid address.'),
  title: Yup.string().required('Food title is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Please include a price.'),
});

const NewMenuItem = ({ isOpen, toggleOpen }) => {
  const initialValues = {
    image: '',
    title: '',
    description: '',
    price: '',
  };

  const handleSubmit = async (values) => {
    const { image, title, description, price } = values;

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggleOpen={toggleOpen} title="Add new Menu Item">
      <Formik
        initialValues={initialValues}
        validationSchema={MenuSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
        render={() => (
          <Form>
            <TextInput icon={FiMapPin} name="title" label="Food name" />
            <TextInput name="description" label="Food description" />
            <TextInput name="price" label="Item Price" />

            <Button label="Add Menu Item" />
          </Form>
        )}
      />
    </Modal>
  );
};

export default NewMenuItem;
