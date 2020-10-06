import { EntityRepository, Repository } from 'typeorm';

import Schedule from '../entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

@EntityRepository(Schedule)
class SchedulesRepository extends Repository<Schedule> {
  /**
   * findByDate
   */
  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const findSchedule = await this.findOne({
      where: { date_start },
    });
    return findSchedule || undefined;
  }

  /**
   * listAllSchedules
   */
  public async listAllSchedules(
    truck_id: string,
  ): Promise<Schedule[] | undefined> {
    const findSchedules = await this.find({
      where: {
        id: truck_id,
      },
    });

    return findSchedules;
  }
}

export default SchedulesRepository;
