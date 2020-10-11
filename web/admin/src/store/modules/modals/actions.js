import ActionTypes from './types';

export const showModal = (modalType, modalProps) => {
  return {
    type: ActionTypes.SHOW_MODAL,
    payload: {
      modalType,
      modalProps,
    },
  };
};

export const hideModal = () => {
  return {
    type: ActionTypes.HIDE_MODAL,
  };
};
