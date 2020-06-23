import React from 'react';
import { useSelector } from 'react-redux';

import AddScheduleModal from '../../pages/Schedule/AddScheduleModal';

export default function ModalManager() {
  const modalLookup = {
    AddScheduleModal
  };

  const currentModal = useSelector(state => state.modal.currentModal);

  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}
