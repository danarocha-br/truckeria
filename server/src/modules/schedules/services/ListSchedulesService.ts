import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}
  /**
   * execute
   */
  public async execute({ truck_id }: IRequest): Promise<Schedule[] | null> {
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError(`No truck profile was found with this given id.`);
    }

    let schedules = await this.cacheProvider.recover<Schedule[]>(
      `schedules-list:${truck_id}`,
    );

    if (!schedules) {
      schedules = await this.schedulesRepository.findAllSchedules(truck_id);

      // await this.cacheProvider.save(`schedules-list:${truck_id}`, schedules);
    }

    return schedules;
  }
}

export default ListSchedulesService;
