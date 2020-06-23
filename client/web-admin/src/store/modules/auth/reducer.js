import produce from 'immer';

import { ActionTypes } from './types';

const INITIAL_STATE = { currentUser: null, error: null };

export default function auth(
  state = INITIAL_STATE,
  action
) {
  return produce(state, draft => {

    switch (action.type) {
      case ActionTypes.SET_CURRENT_USER: {
        draft.loading = true;
        draft.currentUser = action.payload;
        break;
      }

      case ActionTypes.EMAIL_SIGN_IN_START: {
        draft.loading = true;
        break;
      }

      case ActionTypes.EMAIL_SIGN_IN_SUCCESS: {
        draft.loading = false;
        draft.currentUser = action.payload;
        draft.error = null;
        break;
      }

      case ActionTypes.GOOOGLE_SIGNIN_SUCCESS: {
        draft.loading = false;
        draft.currentUser = action.payload;
        draft.error = null;
        break;
      }

      case ActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        draft.error = [...state, action.payload];
        break;
      }

      default:
        return state;
    }
  })
}
