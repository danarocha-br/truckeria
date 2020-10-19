import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
  public async execute({ user_id }: IRequest): Promise<TruckProfile[] | undefined> {

    const truckProfiles = await this.truckProfilesRepository.findAllMyTrucksProfile(
      user_id,
    );

    if (!truckProfiles?.length) {
      return
    }
    return truckProfiles;
  }

}

export default ListTrucksProfilesService;
