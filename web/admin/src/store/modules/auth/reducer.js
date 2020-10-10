import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = {
  token: null,
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.EMAIL_SIGN_IN_REQUEST: {
        draft.token = action.payload.token;
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_SUCCESS: {
        draft.loading = false;
        draft.isAuthenticated = true;
        draft.currentUser = action.payload.user;
        draft.error = null;
        draft.token = action.payload.token;
        break;
      }

      case ActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        draft.error = [action.payload];
        break;
      }

      case ActionTypes.SIGN_UP_REQUEST: {
        draft.token = action.payload.token;
        draft.loading = true;
        break;
      }

      case ActionTypes.SIGN_OUT_REQUEST: {
        draft.isAuthenticated = false;
        draft.token = null;
        draft.currentUser = null;
        break;
      }

      default:
        return state;
    }
  });
}
