import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = { schedule: null, list: null, error: null, loading: false };

export default function truckProfile(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {

      case ActionTypes.LOAD_SCHEDULES_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.LOAD_SCHEDULES_SUCCESS: {
        draft.loading = false;
        draft.list = action.payload.list
        break;
      }

      case ActionTypes.LOAD_MONTH_SCHEDULES_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.LOAD_MONTH_SCHEDULES_SUCCESS: {
        draft.loading = false;
        draft.list = action.payload.list
        break;
      }

      case ActionTypes.CREATE_SCHEDULE_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.CREATE_SCHEDULE_SUCCESS: {
        draft.loading = false;
        draft.schedule = [action.payload.schedule];
        draft.list = [...draft.list.filter(schedule => (
          schedule.id !== action.payload.schedule.id
         )), action.payload.schedule ]
        draft.error = null;
        break;
      }

      case ActionTypes.UPDATE_SCHEDULE_REQUEST: {
        draft.loading = true;
        break;
      }

      case ActionTypes.UPDATE_SCHEDULE_SUCCESS: {
        draft.loading = false;
        draft.schedule = [action.payload.schedule];
        draft.list = [...draft.list.filter(schedule => (
         schedule.id !== action.payload.schedule.id
        )), action.payload.schedule ]
        draft.error = null;
        break;
      }

      case ActionTypes.SCHEDULES_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      default:
        return state;
    }
  });
}
