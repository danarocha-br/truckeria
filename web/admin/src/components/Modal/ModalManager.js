import React from 'react';
import { useSelector } from 'react-redux';

import NewSchedule from '~/pages/Schedule/NewSchedule';

export default function ModalManager() {
  const modalLookup = {
    NewSchedule
  };

  const currentModal = useSelector(state => state.modals.currentModal);

  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}
