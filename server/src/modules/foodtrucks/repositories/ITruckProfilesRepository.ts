import TruckProfile from '../infra/typeorm/entities/TruckProfile';
import ICreateTruckProfile from '../dtos/ICreateTruckProfile';

export default interface ITruckProfilesRepository {
  create(data: ICreateTruckProfile): Promise<TruckProfile>;
  findAllMyTrucksProfile(user_id: string): Promise<TruckProfile[] | undefined>;
  // findById(id: string): Promise<TruckProfile | undefined>;
  // update(profile: TruckProfile): Promise<TruckProfile>;
}
