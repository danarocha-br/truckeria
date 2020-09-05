import { getRepository, Repository } from 'typeorm';
import { isEqual } from 'date-fns';

import Schedule from '../entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async findByDate(date_start: Date): Promise<Schedule | undefined> {
    const findSchedule = await this.ormRepository.findOne({
      where: { date_start },
    });

    return findSchedule || undefined;
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
    const schedule = await this.ormRepository.create({
      truck_id,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    await this.ormRepository.save(schedule);

    return schedule;
  }
}

export default SchedulesRepository;
