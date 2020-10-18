import { injectable, inject } from 'tsyringe';

import Menu from '../infra/typeorm/entities/Menu';
import IMenusRepository from '../repositories/IMenusRepository';
import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  menu_id: string;
  truck_id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  options: string[];
  photo_filename: string;
}

@injectable()
class UpdateMenuService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

  ) {}

  public async execute({
    menu_id,
    user_id,
    truck_id,
    title,
    description,
    type,
    price,
    options,
    photo_filename,
  }: IRequest): Promise<Menu> {
    //check if menu exist
    const menu = await this.menusRepository.findById(menu_id);

    if (!menu) {
      throw new AppError('This menu item does not exist.');
    }

    const truckProfile = await this.truckProfilesRepository.findById(menu.truck_id)

    //check if the user is truckprofile owner
    if (truckProfile?.user_id !== user_id) {
      throw new AppError('It seems that you are not this truck profile owner');
    }

    //check if same title and description combination is already existent
    const listAllMenus = await this.menusRepository.findAll(
      truck_id,
    );

    if (listAllMenus?.length) {

      const menuExists = listAllMenus.some(
        menu =>
          menu.title === title &&
          menu.description === description &&
          menu.id !== menu_id
      );

      if (menuExists) {
        throw new AppError(
          'You have already created a menu with this same title and description.',
        );
      }
    }

    if (photo_filename) {
      const fileName = await this.storageProvider.saveFile(photo_filename);
      truckProfile.photo_filename = fileName;
    }

    menu.title = title;
    menu.description = description;
    menu.type = type;
    menu.options = options;
    menu.price = price;

    return this.menusRepository.update(menu);
  }
}

export default UpdateMenuService;
