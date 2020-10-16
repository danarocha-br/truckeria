import { takeLatest, put, all, call } from 'redux-saga/effects';
import { parseISO, differenceInDays, format, getMonth } from 'date-fns';

import ActionTypes from './types';
import api from '~/services/api';
import history from '~/services/history';
import { schedulesFailure, createScheduleSuccess, loadMonthSchedulesSuccess, updateScheduleSuccess, loadMonthSchedulesRequest } from './actions';
import { hideModal } from "../modals/actions";


// export function* loadSchedules({ payload: { truck_id } }) {

//   try {
//     const response = yield call(api.get, `schedules/${truck_id}/all`);

//     const list = response.data.map(schedule => {
//       const parsedDateStart = parseISO(schedule.date_start);
//       const parsedDateEnd = parseISO(schedule.date_end);
//       const startsIn = differenceInDays(parsedDateStart, new Date());

//       return {
//         ...schedule,
//         date: `${format(parsedDateStart, "eee ',' dd MMMM yyyy ',' hh':'mm")} - ${format(parsedDateEnd, "hh':'mm")}`,
//         day: `${format(parsedDateStart, "dd MMM")}`,
//         address: 'make address calculation',
//         starts_in: `in ${startsIn} days`
//       }});

//     yield put(loadSchedulesSuccess(list));
//     history.push(`/schedule/${truck_id}`);
//   } catch (error) {
//     yield put(schedulesFailure(error));
//   }
// }

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

      const startsInLabel = () => {
        if (startsIn && Math.sign(startsIn === -1 )) {
          return `Past event`
        }

        return `in ${startsIn} days`
    }

      return {
        ...schedule,
        date: `${format(parsedDateStart, "eee ',' dd MMMM yyyy ',' HH':'mm")} - ${format(parsedDateEnd, "H':'mm")}`,
        day: `${format(parsedDateStart, "dd MMM")}`,
        starts_in: startsInLabel(),
        booked: true,
      }});

    yield put(loadMonthSchedulesSuccess(list));
    console.log(list)
    history.push(`/schedule/${truck_id}`);
  } catch (error) {
    yield put(schedulesFailure(error));
  }
}

export function* createSchedule({ payload: { data } }) {

  const { address, city, state, date_start, date_end, time_start, time_end } = data.values;
  const { truck_id } = data;

  const fakeLat = '-25.48087';
  const fakeLon = '-49.304424';

  const parsedDateStart = parseISO(date_start);
  const parsedDateEnd = parseISO(date_end);

  const [, minutesStart] = time_start.split(':');
  const [hoursStart, ] = time_start.split(':');

  const [, minutesEnd] = time_end.split(':');
  const [hoursEnd, ] = time_end.split(':');

  const dateStart = new Date(parsedDateStart.getFullYear(), parsedDateStart.getMonth(), parsedDateStart.getDate(), hoursStart, minutesStart)
  const dateEnd = new Date(parsedDateEnd.getFullYear(), parsedDateEnd.getMonth(), parsedDateEnd.getDate(), hoursEnd, minutesEnd)


  try {
    const response = yield call(api.post, 'schedules', {
      truck_id,
      address,
      city,
      state,
      lat: fakeLat,
      lon: fakeLon,
      date_start: dateStart,
      date_end: dateEnd,
    });
    yield put(createScheduleSuccess(response.data));
  } catch (error) {
    yield put(schedulesFailure(error));
  }
}

export function* updateSchedule({ payload: { data }}) {
  const { address, city, state, date_start, date_end, time_start, time_end, id, truck_id } = data;
  const fakeLat = '-25.48087';
  const fakeLon = '-49.304424';

  const parsedDateStart = parseISO(date_start);
  const parsedDateEnd = parseISO(date_end);

  const [, minutesStart] = time_start.split(':');
  const [hoursStart, ] = time_start.split(':');

  const [, minutesEnd] = time_end.split(':');
  const [hoursEnd, ] = time_end.split(':');

  const year = parsedDateStart.getFullYear();
  const month = parsedDateStart.getMonth() ;


  const dateStart = new Date(parsedDateStart.getFullYear(), parsedDateStart.getMonth(), parsedDateStart.getDate(), hoursStart, minutesStart)
  const dateEnd = new Date(parsedDateEnd.getFullYear(), parsedDateEnd.getMonth(), parsedDateEnd.getDate(), hoursEnd, minutesEnd)

  try {
    const response = yield call(api.put, 'schedules', {
      schedule_id: id,
      address,
      city,
      state,
      lat: fakeLat,
      lon: fakeLon,
      date_start: dateStart,
      date_end: dateEnd,
    });

    yield put(updateScheduleSuccess(response.data));
    yield put(hideModal());
    yield put(loadMonthSchedulesRequest(truck_id, month + 1, year));
  } catch (error) {
    console.log(error)
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_SCHEDULE_REQUEST, createSchedule),
  takeLatest(ActionTypes.LOAD_MONTH_SCHEDULES_REQUEST, loadMonthSchedules),
  takeLatest(ActionTypes.UPDATE_SCHEDULE_REQUEST, updateSchedule),
]);
