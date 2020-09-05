import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Schedule from '../../infra/typeorm/entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

class SchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const schedule = this.schedules.find(schedule =>
      isEqual(schedule.date_start, date_start),
    );

    return schedule;
  }

  public async create({
    truck_id,
    city,
    state,
    lat,
    lon,
    date_start,
    date_end,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();

    Object.assign(schedule, {
      id: uuid(),
      truck_id,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    this.schedules.push(schedule);

    return schedule;
  }
}

export default SchedulesRepository;
