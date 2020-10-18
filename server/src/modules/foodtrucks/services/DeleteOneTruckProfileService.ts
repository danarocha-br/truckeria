import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
  user_id: string;
}

@injectable()
class DeleteOneTruckProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,
  ) {}

  /**
   * execute
   */
  public async execute({ truck_id, user_id }: IRequest): Promise<DeleteResult | TruckProfile[]> {
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError(`This food-truck profile does not exist.`);
    }

    const truckOwner = await this.usersRepository.findById(user_id);

    if (!truckOwner) {
      throw new AppError(`This user does not exist.`);
    }

    return this.truckProfilesRepository.delete(truck_id);
  }
}

export default DeleteOneTruckProfileService;
