import { uuid } from 'uuidv4';

import TruckProfile from '../../infra/typeorm/entities/TruckProfile';

import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import ICreateTruckProfile from '@modules/foodtrucks/dtos/ICreateTruckProfileDTO';

class FakeTruckProfilesRepository implements ITruckProfileRepository {
  private truckProfiles: TruckProfile[] = [];

  /**
   * findAllMyTrucksProfile
   */
  public async findAllMyTrucksProfile(
    user_id: string,
  ): Promise<TruckProfile[] | undefined> {
    let { truckProfiles } = this;

    if (!user_id) {
      throw new Error('No id provided.');
    }

    truckProfiles = this.truckProfiles.filter(user => user.user_id === user_id);
    return truckProfiles;
  }

  /**
   * findById
   */
  public async findById(truck_id: string): Promise<TruckProfile | undefined> {
    if (!truck_id) {
      throw new Error('No id provided.');
    }

    const findTruck = this.truckProfiles.find(truck => truck.id === truck_id);

    return findTruck;
  }

  /**
   * create
   */
  public async create({
    user_id,
    name,
    description,
    cuisines,
    payment_methods,
    catering,
    photo_filename,
    email,
    phone,
    city,
    state,
    web,
    instagram,
    facebook,
    twitter,
  }: ICreateTruckProfile): Promise<TruckProfile> {
    const truckProfile = new TruckProfile();

    Object.assign(truckProfile, {
      id: uuid(),
      user_id,
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      photo_filename,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    });

    this.truckProfiles.push(truckProfile);

    return truckProfile;
  }

  /**
   * update
   */
  public async update(profile: TruckProfile): Promise<TruckProfile> {
    const profileIndex = this.truckProfiles.findIndex(
      findTruck => findTruck.id === profile.id,
    );

    this.truckProfiles[profileIndex] = profile;

    return profile;
  }
}

export default FakeTruckProfilesRepository;
