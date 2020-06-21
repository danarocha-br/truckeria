import { FunctionComponent } from 'react';

import { ActionTypes } from './types';

export function openModal(modalType) {
  return {
    type: ActionTypes.modal_OPEN,
    payload: { modalType },
  };
}

export function closeModal() {
  return {
    type: ActionTypes.modal_CLOSE,
  };
}
