import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListTrucksProfilesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,
  ) {}
  /**
   * execute
   */
  public async execute({ user_id }: IRequest): Promise<TruckProfile[]> {
    const truckProfiles = await this.truckProfilesRepository.findAllMyTrucksProfile(
      user_id,
    );

    if (!truckProfiles) {
      throw new AppError(`You don't have any food truck profile yet.`);
    }

    return truckProfiles;
  }
}

export default ListTrucksProfilesService;
