import { uuid } from 'uuidv4';
import { getMonth, isEqual, getYear } from 'date-fns';

import Schedule from '../../infra/typeorm/entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindAllSchedulesWithinIntervalDTO from '@modules/schedules/dtos/IFindAllSchedulesWithinIntervalDTO';

class SchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const schedule = this.schedules.find(schedule =>
      isEqual(schedule.date_start, date_start),
    );

    return schedule;
  }

  /**
   * findAllSchedules
   */
  public async findAllSchedules(truck_id: string): Promise<Schedule[] | null> {
    const findSchedules = this.schedules.filter(
      schedule => schedule.truck_id === truck_id,
    );

    return findSchedules;
  }

  /**
   * findAllSchedulesWithinInterval
   */
  public async findAllSchedulesWithinInterval({
    truck_id,
    month,
    year,
  }: IFindAllSchedulesWithinIntervalDTO): Promise<Schedule[] | undefined> {
    const schedules = this.schedules.filter(
      schedule =>
        schedule.truck_id === truck_id &&
        getMonth(schedule.date_start) + 1 === month &&
        getYear(schedule.date_start) === year,
    );
    return schedules;
  }

  /**
   * create
   */
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
