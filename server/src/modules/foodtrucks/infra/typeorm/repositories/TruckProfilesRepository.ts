import { getRepository, Repository } from 'typeorm';

import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ICreateTruckProfile from '@modules/foodtrucks/dtos/ICreateTruckProfile';

import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';

class TruckProfilesRepository implements ITruckProfileRepository {
  private ormRepository: Repository<TruckProfile>;

  constructor() {
    this.ormRepository = getRepository(TruckProfile);
  }

  /**
   * findAllMyTrucksProfile
   */
  public async findAllMyTrucksProfile(
    user_id: string,
  ): Promise<TruckProfile[]> {
    const truckProfiles = await this.ormRepository.find({
      where: { user_id: user_id },
    });

    return truckProfiles;
  }

  /**
   * create
   */
  public async create(truckData: ICreateTruckProfile): Promise<TruckProfile> {
    const truckProfile = this.ormRepository.create(truckData);

    await this.ormRepository.save(truckProfile);

    return truckProfile;
  }
}

export default TruckProfilesRepository;
