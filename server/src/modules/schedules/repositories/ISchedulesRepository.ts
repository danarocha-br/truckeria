import { DeleteResult } from 'typeorm';

import Schedule from '../infra/typeorm/entities/Schedule';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';
import IFindAllSchedulesWithinIntervalDTO from '../dtos/IFindAllSchedulesWithinIntervalDTO';

export default interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  update(schedule: Schedule): Promise<Schedule>;
  findByDate(date_start: Date): Promise<Schedule | undefined>;
  findById(schedule_id: string): Promise<Schedule | undefined>;
  findAllSchedules(truck_id: string): Promise<Schedule[] | null>;
  findAllSchedulesWithinInterval(
    data: IFindAllSchedulesWithinIntervalDTO,
  ): Promise<Schedule[] | undefined>;
  delete(schedule_id: string): Promise<DeleteResult | Schedule[]>;
}
