import { DeleteResult } from 'typeorm';

import TruckProfile from '../infra/typeorm/entities/TruckProfile';
import ICreateTruckProfile from '../dtos/ICreateTruckProfileDTO';

export default interface ITruckProfilesRepository {
  create(data: ICreateTruckProfile): Promise<TruckProfile>;
  findAllMyTrucksProfile(user_id: string): Promise<TruckProfile[] | undefined>;
  findById(truck_id: string): Promise<TruckProfile | undefined>;
  update(profile: TruckProfile): Promise<TruckProfile>;
  delete(truck_id: string): Promise<TruckProfile[] | DeleteResult>;
}
