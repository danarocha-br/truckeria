import { takeLatest, put, all, call } from 'redux-saga/effects';
import { parseISO, differenceInDays, format } from 'date-fns';

import ActionTypes from './types';
import api from '~/services/api';
import history from '~/services/history';
import { loadSchedulesSuccess, schedulesFailure, createScheduleSuccess, loadMonthSchedulesSuccess} from './actions';


export function* loadSchedules({ payload: { truck_id } }) {

  try {
    const response = yield call(api.get, `schedules/${truck_id}/all`);


    const list = response.data.map(schedule => {
      const parsedDateStart = parseISO(schedule.date_start);
      const parsedDateEnd = parseISO(schedule.date_end);
      const startsIn = differenceInDays(parsedDateStart, new Date());

      return {
        ...schedule,
        date: `${format(parsedDateStart, "eee ',' dd MMMM yyyy ',' hh':'mm")} - ${format(parsedDateEnd, "hh':'mm")}`,
        day: `${format(parsedDateStart, "dd MMM")}`,
        address: 'make address calculation',
        starts_in: `in ${startsIn} days`
      }});

    yield put(loadSchedulesSuccess(list));
    history.push(`/schedule/${truck_id}`);
  } catch (error) {
    yield put(schedulesFailure(error));
  }
}

export function* loadMonthSchedules({ payload: { truck_id, month, year } }) {

  try {
    const response = yield call(api.get, `schedules/${truck_id}/month`, {
      params: {
        month,
        year
      }
    });

    const list = response.data.map(schedule => {
      const parsedDateStart = parseISO(schedule.date_start);
      const parsedDateEnd = parseISO(schedule.date_end);
      const startsIn = differenceInDays(parsedDateStart, new Date());

      return {
        ...schedule,
        date: `${format(parsedDateStart, "eee ',' dd MMMM yyyy ',' hh':'mm")} - ${format(parsedDateEnd, "hh':'mm")}`,
        day: `${format(parsedDateStart, "dd MMM")}`,
        address: 'make address calculation',
        starts_in: `in ${startsIn} days`,
        booked: true,
      }});

    yield put(loadMonthSchedulesSuccess(list));
    history.push(`/schedule/${truck_id}`);
  } catch (error) {
    yield put(schedulesFailure(error));
  }
}

export function* createSchedule({ payload: {data } }) {

  try {
    const response = yield call(api.post, 'schedules', {
      data,
    });
    yield put(createScheduleSuccess(response.data));
  } catch (error) {
    yield put(schedulesFailure(error));
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_SCHEDULE_REQUEST, createSchedule),
  takeLatest(ActionTypes.LOAD_SCHEDULES_REQUEST, loadSchedules),
  takeLatest(ActionTypes.LOAD_MONTH_SCHEDULES_REQUEST, loadMonthSchedules),
]);
