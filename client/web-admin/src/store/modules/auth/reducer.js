import produce from 'immer';

import { ActionTypes } from './types';

const INITIAL_STATE = { currentUser: null, error: null };

export default function auth(
  state = INITIAL_STATE,
  action
) {
  return produce(state, draft => {

    switch (action.type) {

      case ActionTypes.EMAIL_SIGN_IN_START: {
        draft.loading = true;
        break;
      }

      case ActionTypes.GOOGLE_SIGN_IN_START: {
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_IN_SUCCESS: {
        draft.loading = false;
        draft.currentUser = action.payload;
        draft.error = null;
        break;
      }

      case ActionTypes.SIGN_OUT_START: {
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_OUT_SUCCESS: {
        draft.loading = false;
        draft.currentUser = null;
        draft.error = null;
        break;
      }

      case ActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        draft.error = [...state, action.payload];
        break;
      }

      case ActionTypes.SIGN_OUT: {
        draft.loading = false;
        break;
      }

      default:
        return state;
    }
  })
}
