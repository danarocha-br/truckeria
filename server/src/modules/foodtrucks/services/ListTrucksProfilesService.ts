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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}
  /**
   * execute
   */
  public async execute({ user_id }: IRequest): Promise<TruckProfile[]> {
    let truckProfiles = await this.cacheProvider.recover<
      TruckProfile[] | undefined
    >(`truckprofiles-list:${user_id}`);

    if (!truckProfiles) {
      truckProfiles = await this.truckProfilesRepository.findAllMyTrucksProfile(
        user_id,
      );

      await this.cacheProvider.save(
        `truckprofiles-list:${user_id}`,
        truckProfiles,
      );

      if (!truckProfiles?.length) {
        throw new AppError(`You don't have any food truck profile yet.`);
      }
    }

    return truckProfiles;
  }
}

export default ListTrucksProfilesService;
