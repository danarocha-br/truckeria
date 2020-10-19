import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import Menu from '../infra/typeorm/entities/Menu';
import IMenusRepository from '../repositories/IMenusRepository';
import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  menu_id: string;
  user_id: string;
}

@injectable()
class DeleteMenuService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

    @inject('MenusRepository')
    private menusRepository: IMenusRepository,

  ) {}

  public async execute({
    menu_id,
    user_id,
  }: IRequest): Promise<Menu[] | DeleteResult> {
    //check if menu exist
    const menu = await this.menusRepository.findById(menu_id);

    if (!menu) {
      throw new AppError('This menu does not exist.');
    }

    const truckProfile = await this.truckProfilesRepository.findById(menu.truck_id);

    //check if the user is truckprofile owner
    if (truckProfile?.user_id !== user_id) {
      throw new AppError('It seems that you are not this truck profile owner');
    }


    return this.menusRepository.delete(menu.id);
  }
}

export default DeleteMenuService;
