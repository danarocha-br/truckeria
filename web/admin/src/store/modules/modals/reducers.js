import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = {
  currentModal: null,
};

export default function modals(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.SHOW_MODAL: {
        draft.currentModal = action.payload;
        break;
      }

      case ActionTypes.HIDE_MODAL: {
        draft.currentModal = null;
        break;
      }

      default:
    }
  });
}
