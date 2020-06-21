import React from 'react';

import Modal from '../../components/Modal';

export interface FormProps {
  isOpen: boolean;
}

const ScheduleModal: React.FC<FormProps | any> = ({ isOpen }) => {
  return (
    // <Modal isOpen={isOpen}>
    <h1>oi</h1>
    // </Modal>
  );
};

export default ScheduleModal;
