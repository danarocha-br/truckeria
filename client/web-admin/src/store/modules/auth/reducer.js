import produce from 'immer';

import { ActionTypes } from './types';

const INITIAL_STATE = { currentUser: null };

export default function auth(
  state = INITIAL_STATE,
  action
) {
  return produce(state, draft => {

    switch (action.type) {
      case ActionTypes["@auth_SET_CURRENT_USER"]: {
        draft.loading = true;
        break;
      }

      case ActionTypes["@auth_SIGN_IN_SUCCESS"]: {
        draft.loading = false;
        draft.currentUser = action.payload;
        break;
      }

      case ActionTypes["@auth_SIGN_FAILURE"]: {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  })
}
