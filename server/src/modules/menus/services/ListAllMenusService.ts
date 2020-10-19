import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IMenusRepository from '@modules/menus/repositories/IMenusRepository';
import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import Menu from '@modules/menus/infra/typeorm/entities/Menu';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
}

@injectable()
class ListAllMenusService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

  ) {}
  /**
   * execute
   */
  public async execute({ truck_id }: IRequest): Promise<Menu[] | undefined> {

    const menus = await this.menusRepository.findAll(
      truck_id,
    );

    const foodTruckExists = await this.truckProfilesRepository.findById(truck_id);

    if (!foodTruckExists) {
      throw new AppError('Was not able to find this food truck, please try another id.');
    }

    return menus;
  }

}

export default ListAllMenusService;
