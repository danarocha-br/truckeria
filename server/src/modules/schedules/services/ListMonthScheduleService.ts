import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
  month: number;
  year: number;
}

@injectable()
class ListMonthScheduleService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}
  /**
   * execute
   */
  public async execute({
    truck_id,
    year,
    month,
  }: IRequest): Promise<Schedule[] | undefined> {
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError(`No truck profile was found with this given id.`);
    }

    const schedules = await this.schedulesRepository.findAllSchedulesWithinInterval(
      {
        truck_id,
        year,
        month,
      },
    );

    return schedules;
  }
}

export default ListMonthScheduleService;
