import ActionTypes from './types';


// LIST
export function loadMonthSchedulesRequest(truck_id, month, year) {
  return {
    type: ActionTypes.LOAD_MONTH_SCHEDULES_REQUEST,
    payload:{ truck_id, month, year },
  };
}

export function loadMonthSchedulesSuccess(list) {
  return {
    type: ActionTypes.LOAD_MONTH_SCHEDULES_SUCCESS,
    payload: { list },
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

export function loadSchedulesFailure(error) {
  return {
    type: ActionTypes.LOAD_MONTH_SCHEDULES_FAILURE,
    payload: error,
  };
}

// CREATE
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


export function createSchedulesFailure(error) {
  return {
    type: ActionTypes.CREATE_SCHEDULE_FAILTURE,
    payload: error,
  };
}

// UPDATE
export function updateScheduleRequest(data) {
  return {
    type: ActionTypes.UPDATE_SCHEDULE_REQUEST,
    payload: { data },
  };
}

export function updateScheduleSuccess(schedule) {
  return {
    type: ActionTypes.UPDATE_SCHEDULE_SUCCESS,
    payload: { schedule },
  };
}

export function updateSchedulesFailure(error) {
  return {
    type: ActionTypes.UPDATE_SCHEDULE_FAILURE,
    payload: error,
  };
}

// DELETE
export function deleteScheduleRequest(schedule_id) {
  return {
    type: ActionTypes.DELETE_SCHEDULE_REQUEST,
    payload: { schedule_id },
  };
}

export function deleteScheduleSuccess(schedule_id) {
  return {
    type: ActionTypes.DELETE_SCHEDULE_SUCCESS,
    payload: { schedule_id },
  };
}

export function deleteScheduleFailure(error) {
  return {
    type: ActionTypes.DELETE_SCHEDULE_FAILTURE,
    payload: error,
  };
}
