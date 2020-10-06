import { getRepository, Repository, Raw } from 'typeorm';

import Schedule from '../entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindAllSchedulesWithinIntervalDTO from '@modules/schedules/dtos/IFindAllSchedulesWithinIntervalDTO';

class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  /**
   * findByDate
   */
  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const findSchedule = await this.ormRepository.findOne({
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
    const findSchedules = await this.ormRepository.find({
      where: { truck_id: truck_id },
    });

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
    const parsedMonth = String(month).padStart(2, '0');

    const schedules = await this.ormRepository.find({
      where: {
        truck_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return schedules;
  }

  /**
   * create
   */
  public async create(scheduleData: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = this.ormRepository.create(scheduleData);

    await this.ormRepository.save(schedule);

    return schedule;
  }
}

export default SchedulesRepository;
