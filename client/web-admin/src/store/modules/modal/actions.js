import { FunctionComponent } from 'react';

import { ActionTypes } from './types';

export function openModal(modalType, modalProps) {
  return {
    type: ActionTypes.SHOW_MODAL,
    payload: {
      modalType,
      modalProps,
    },
  };
}

export function closeModal() {
  return {
    type: ActionTypes.HIDE_MODAL,
  };
}
