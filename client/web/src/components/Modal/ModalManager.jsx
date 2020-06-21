import React from 'react';
import { useSelector } from 'react-redux';

import ScheduleModal from '../../pages/Schedule/ScheduleModal';

const ModalManager = () => {
  const currentModal = useSelector((state) => state.modal.currentModal);
  const modalLookup = {
    ScheduleModal,
  };

  let renderedModal = null;

  if (currentModal) {
    const { modalType } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent />;
  } else {
    return null;
  }
  return <span>{renderedModal}</span>;
};

export default ModalManager;
