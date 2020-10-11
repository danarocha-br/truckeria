import React, {useCallback} from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';
import light from '~/styles/tokens/light';
import { hideModal } from '~/store/modules/modals/actions';

const modal = {
  open: {
    opacity: 1,
    x: 0,
    zIndex: 99,
    transition: {
      type: 'spring',
      damping: 13,
      stiffness: 100,
    },
  },
  closed: {
    opacity: 0,
    width: 0,
    x: 500,
    zIndex: -1,
    transition: {
      delay: 0.5,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
};



const Modal = ({ title, children }) => {

  const isModalOpen = useSelector(state => state.modals.currentModal);
  const dispatch = useDispatch();

  const handleHideModal = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch])

  return (
    <ThemeProvider theme={light}>
      <AnimateSharedLayout type="crossfade">
        <Container
          layout
          initial="closed"
          animate={isModalOpen ? 'open' : 'closed'}
          exit={{ display: 'none' }}
          variants={modal}
        >
          <header className="flex w-full justify-between text-gray-900 text-xl font-medium mb-8">
            <h1>{title}</h1>
            <span className="close-icon" onClick={() => handleHideModal()}>
              <div className="bar" />
              <div className="bar" />
            </span>

            <div className="close-label">close</div>
          </header>
          {children}
        </Container>
      </AnimateSharedLayout>
    </ThemeProvider>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
