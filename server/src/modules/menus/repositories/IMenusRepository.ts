import { DeleteResult } from 'typeorm';

import Menu from '../infra/typeorm/entities/Menu';
import ICreateMenuDTO from '../dtos/ICreateMenuDTO';

export default interface ITruckProfilesRepository {
  create(menuData: ICreateMenuDTO): Promise<Menu>;
  findById(menu_id: string): Promise<Menu | undefined>;
  findAll(truck_id: string): Promise<Menu[] | undefined>;
  findByType(truck_id: string, type: string): Promise<Menu[] | undefined>;
  update(data: Menu): Promise<Menu>;
  delete(menu_id: string): Promise<DeleteResult | Menu[]>;
}
