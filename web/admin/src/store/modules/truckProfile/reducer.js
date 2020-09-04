import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = { truckProfile: null, error: null, loading: false };

export default function truckProfile(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.TRUCK_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.CREATE_TRUCK_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.truckProfile = [action.payload];
        draft.error = null;
        break;
      }

      case ActionTypes.TRUCK_PROFILE_FAILTURE: {
        draft.loading = false;
        draft.error = [action.payload];
        break;
      }

      default:
        return state;
    }
  });
}
