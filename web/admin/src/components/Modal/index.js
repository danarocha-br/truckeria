import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';

import { Container } from './styles';

const modal = {
  open: {
    opacity: 1,
    x: 0,
    width: '35%',
    transition: {
      type: 'spring',
      damping: 13,
      stiffness: 100,
    },
  },
  closed: {
    opacity: 0,
    x: 500,
    width: 0,
    transition: {
      delay: 0.5,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
};

const Modal = ({ isOpen, toggleOpen, title }) => {
  return (
    <AnimateSharedLayout type="crossfade">
      <Container
        layout
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        exit={{ opacity: 0 }}
        variants={modal}
      >
        <header className="flex w-full justify-between text-gray-900 text-xl font-medium py-10 px-8">
          <h1>{title}</h1>
          <span className="close-icon" onClick={() => toggleOpen()}>
            <div className="bar" />
            <div className="bar" />
          </span>

          <div className="close-label">close</div>
        </header>
      </Container>
    </AnimateSharedLayout>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
