import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

import AppError from '@shared/errors/AppError';
import Schedule from '../infra/typeorm/entities/Schedule';

interface IRequest {
  truck_id: string;
}

@injectable()
class ListSchedulesService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}
  /**
   * execute
   */
  public async execute({ truck_id }: IRequest): Promise<Schedule[] | null> {
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError(`No truck profile was found with this given id.`);
    }

      const schedules = await this.schedulesRepository.findAllSchedules(truck_id);

    return schedules;
  }
}

export default ListSchedulesService;
