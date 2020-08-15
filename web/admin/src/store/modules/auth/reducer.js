import produce from 'immer';

import { ActionTypes } from './types.ts';

const INITIAL_STATE = { currentUser: null, error: null, loading: false };

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.EMAIL_SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.GOOGLE_SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_IN_SUCCESS: {
        draft.loading = false;
        draft.currentUser = action.payload;
        draft.error = null;
        break;
      }

      case ActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        draft.error = [action.payload];
        break;
      }

      case ActionTypes.SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_UP_SUCCESS: {
        draft.loading = false;
        draft.currentUser = action.payload;
        draft.error = null;
        break;
      }

      case ActionTypes.SIGN_OUT_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_OUT_SUCCESS: {
        draft.loading = false;
        draft.currentUser = null;
        draft.error = null;
        break;
      }

      default:
        return state;
    }
  });
}
