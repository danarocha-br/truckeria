import ActionTypes from './types';


export function schedulesFailure() {
  return {
    type: ActionTypes.SCHEDULES_FAILURE,
  };
}

export function loadSchedulesRequest(truck_id) {
  return {
    type: ActionTypes.LOAD_SCHEDULES_REQUEST,
    payload:{ truck_id },
  };
}

export function loadSchedulesSuccess(list) {
  return {
    type: ActionTypes.LOAD_SCHEDULES_SUCCESS,
    payload: { list },
  };
}

export function createScheduleRequest(data) {
  return {
    type: ActionTypes.CREATE_SCHEDULE_REQUEST,
    payload:{ data },
  };
}

export function createScheduleSuccess(schedule) {
  return {
    type: ActionTypes.CREATE_SCHEDULE_SUCCESS,
    payload: { schedule },
  };
}
