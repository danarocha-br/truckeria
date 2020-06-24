import produce from 'immer';

// import { ActionTypes } from './types';
import { ActionTypes as AuthActionTypes } from '../auth/types';

const INITIAL_STATE = { profile: null, error: null };

export default function user(
  state = INITIAL_STATE,
  action
) {
  return produce(state, draft => {

    switch (action.type) {
      case AuthActionTypes.EMAIL_SIGN_IN_SUCCESS: {
        draft.profile = action.payload;
        break;
      }

      default:
        return state;
    }
  })
}
