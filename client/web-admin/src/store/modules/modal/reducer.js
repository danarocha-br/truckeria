import produce from 'immer';

import { ActionTypes } from './types';

const INITIAL_STATE = {
  currentModal: null,
};

export default function modal(
  state = INITIAL_STATE,
  action
) {
  return produce(state, draft => {

    switch (action.type) {
      case ActionTypes.SHOW_MODAL: {
        draft.modal = action.payload;
        break;
      }

      case ActionTypes.HIDE_MODAL: {
        draft.modal = null;
        break;
      }

      default:
        return state;
    }
  })
}

