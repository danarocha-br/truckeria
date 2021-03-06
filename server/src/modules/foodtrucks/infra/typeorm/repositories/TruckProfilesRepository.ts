import { DeleteResult, getRepository, Repository } from 'typeorm';

import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ICreateTruckProfile from '@modules/foodtrucks/dtos/ICreateTruckProfileDTO';

import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';
import User from '@modules/users/infra/typeorm/entities/User';

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
      order: {
        name: "ASC"
      },
      // relations: ['menus']
    });

    return truckProfiles;
  }

  /**
   * findById
   */
  public async findById(truck_id: string): Promise<TruckProfile | undefined> {
    const findTruck = this.ormRepository.findOne({
      where: { id: truck_id },
    });

    return findTruck;
  }

  /**
   * create
   */
  public async create(truckData: ICreateTruckProfile): Promise<TruckProfile> {
    const truckProfile = this.ormRepository.create(truckData);

    await this.ormRepository.save(truckProfile);

    return truckProfile;
  }

  /**
   * update
   */
  public async update(profile: TruckProfile): Promise<TruckProfile> {
    return this.ormRepository.save(profile);
  }

  /**
   * delete
   */
  public async delete(truck_id: string): Promise<DeleteResult | TruckProfile[]> {
    return this.ormRepository.delete(truck_id);
  }
}

export default TruckProfilesRepository;
