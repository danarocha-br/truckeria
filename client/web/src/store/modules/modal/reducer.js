import { ActionTypes } from './types';

const INITIAL_STATE = {
  currentModal: null,
};

export default function modal(
  state= INITIAL_STATE,
  action,
) {
  switch (action.type) {
    case ActionTypes.modal_OPEN:
      return {
        ...state,
        currentModal: action.payload,
      };
    case ActionTypes.modal_CLOSE:
      return null;

    default:
      return state;
  }
}

