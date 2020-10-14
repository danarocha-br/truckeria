import { uuid } from 'uuidv4';
import { getMonth, isEqual, getYear } from 'date-fns';

import Schedule from '../../infra/typeorm/entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindAllSchedulesWithinIntervalDTO from '@modules/schedules/dtos/IFindAllSchedulesWithinIntervalDTO';
import { DeleteResult } from 'typeorm';

class SchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  /**
   * findByDate
   */
  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const schedule = this.schedules.find(schedule =>
      isEqual(schedule.date_start, date_start),
    );

    return schedule;
  }

  /**
   * findById
   */
  public async findById(schedule_id: string): Promise<Schedule | undefined> {
      if (!schedule_id) {
        throw new Error('No id provided.');
      }

      const findSchedule = this.schedules.find(schedule => schedule.id === schedule_id);

      return findSchedule;
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

  /**
   * update
   */
  public async update(schedule: Schedule): Promise<Schedule> {
    const scheduleIndex = this.schedules.findIndex(
      index => index.id === schedule.id,
    );

    this.schedules[scheduleIndex] = schedule;

    return schedule;
  }

   /**
   * delete
   */
  public async delete(
    schedule_id: string,
  ): Promise<undefined | DeleteResult> {
    const findProfile = this.schedules.filter(
      schedule => schedule.id === schedule_id,
    );

    return raw;
  }
}

export default SchedulesRepository;
