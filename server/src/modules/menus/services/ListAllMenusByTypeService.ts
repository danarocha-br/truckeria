import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IMenusRepository from '@modules/menus/repositories/IMenusRepository';
import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import Menu from '@modules/menus/infra/typeorm/entities/Menu';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
  type: string;
}

@injectable()
class ListAllMenusByTypeService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

  ) {}
  /**
   * execute
   */
  public async execute({ truck_id, type }: IRequest): Promise<Menu[] | undefined> {

    const foodTruckExists = await this.truckProfilesRepository.findById(truck_id);

    if (!foodTruckExists) {
      throw new AppError('Was not able to find this food truck, please try another id.');
    }

    const menus = await this.menusRepository.findByType(
      truck_id,
      type
    );

    return menus;
  }

}

export default ListAllMenusByTypeService;
