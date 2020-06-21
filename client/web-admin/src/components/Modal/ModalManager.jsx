import React from 'react';
import { useSelector } from 'react-redux';

import ScheduleModal from '../../pages/Schedule/ScheduleModal';

export default function ModalManager() {
  const modalLookup = {
    ScheduleModal
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
