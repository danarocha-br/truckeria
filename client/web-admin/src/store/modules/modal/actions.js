import { FunctionComponent } from 'react';

import { ActionTypes } from './types';

export function showModal(modalType, modalProps) {
  return {
    type: ActionTypes.SHOW_MODAL,
    payload: {
      modalType,
      modalProps,
    },
  };
}

export function hideModal() {
  return {
    type: ActionTypes.HIDE_MODAL,
  };
}
