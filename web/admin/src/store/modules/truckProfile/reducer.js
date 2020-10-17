import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = { profile: null, list: null, error: null, loading: false };

export default function truckProfile(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.CREATE_TRUCK_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.CREATE_TRUCK_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.profile = [action.payload.data];
        draft.error = null;
        break;
      }
      case ActionTypes.CREATE_TRUCK_PROFILE_FAILURE: {
        draft.loading = false;
        draft.error = [action.payload];
        break;
      }

      // list
      case ActionTypes.LOAD_TRUCK_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.LOAD_TRUCK_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.list = action.payload.truckProfiles
        break;
      }
      case ActionTypes.LOAD_TRUCK_PROFILE_FAILURE: {
        draft.loading = false;
        draft.error = [action.payload];
        break;
      }

      // delete
      case ActionTypes.DELETE_TRUCK_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.DELETE_TRUCK_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.list = [...draft.list.filter(truck => (
         truck.id !== action.payload.truck_id
        ))]
        draft.error = null;
        break;
      }
      case ActionTypes.DELETE_TRUCK_PROFILE_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      default:
        return state;
    }
  });
}
