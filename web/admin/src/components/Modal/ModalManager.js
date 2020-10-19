import React from 'react';
import { useSelector } from 'react-redux';

import NewSchedule from '~/pages/Schedule/ModalNewSchedule/NewSchedule';
import UpdateSchedule from '~/pages/Schedule/ModalUpdateSchedule/UpdateSchedule';

import NewMenu from '~/pages/Menu/ModalNewMenu/NewMenu';
import UpdateMenu from '~/pages/Menu/ModalUpdateMenu/UpdateMenu';

export default function ModalManager() {
  const modalLookup = {
    NewSchedule,
    UpdateSchedule,
    NewMenu,
    UpdateMenu
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
