import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
}

@injectable()
class ListOneTruckProfileService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,
  ) {}

  /**
   * execute
   */
  public async execute({ truck_id }: IRequest): Promise<TruckProfile> {
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError(`No truck profile was found with this given id.`);
    }

    return truckProfile;
  }
}

export default ListOneTruckProfileService;
