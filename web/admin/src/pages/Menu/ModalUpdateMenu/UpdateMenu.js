import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Modal from '~/components/Modal';
import Form from './UpdateMenuForm';

import { updateMenuRequest } from "~/store/modules/menus/actions";

const MenuSchema = Yup.object().shape({
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
  photo_filename: Yup.string(),
  price: Yup.number().required('Please provide a price.')
});

const UpdateMenu = ({ menu }) => {

  const initialValues = {
   ...menu,
  };

  const [formValues, setformValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit =  useCallback((values) => {
      dispatch(updateMenuRequest(values))
  }, [dispatch]);


  return (
    <Modal title={`Edit Menu Item Details:`} >
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

export default UpdateMenu;
