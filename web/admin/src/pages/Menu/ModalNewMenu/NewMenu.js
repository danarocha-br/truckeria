import React, {useState, useCallback} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Modal from '~/components/Modal';
import Form from './NewMenuForm';

import { createMenuRequest } from "~/store/modules/menus/actions";

const MenuSchema = Yup.object().shape({
  files: Yup.mixed(),
  title: Yup.string().required('Please insert a title for the menu item.'),
  description: Yup.string().required('Description is required.'),
  type: Yup.string().required('Please choose a category type.'),
  options: Yup.array()
  .of(
    Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .nullable()
  )
  .max(3, 'You can add up to 3 options.'),
  price: Yup.number().required('Please provide a price.')
});

const NewMenuItem = ({ truck_id }) => {

  const initialValues = {
    files: null,
    title: '',
    description: '',
    type: '',
    options: [],
    price: '',
  };

  const [formValues, setformValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit = useCallback((values) => {

    dispatch(createMenuRequest({ ...values, truck_id}));
  }, [dispatch, truck_id]);


  return (
    <Modal title="Add new Menu Item">
      <Formik
        initialValues={formValues}
        validationSchema={MenuSchema}
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

export default NewMenuItem;
