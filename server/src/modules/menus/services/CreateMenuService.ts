import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Menu from '../infra/typeorm/entities/Menu';
import IMenusRepository from '../repositories/IMenusRepository';
import ITruckProfilesRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  truck_id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  options: string[];
  photo_filename: string;
}

@injectable()
class CreateTruckProfileService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfilesRepository,

    @inject('MenusRepository')
    private menusRepository: IMenusRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    truck_id,
    title,
    description,
    type,
    price,
    options,
    photo_filename,
  }: IRequest): Promise<Menu> {
    // find truck profile
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError('This food truck profile does not exist.');
    }

    // check if this user is the food truck admin user
    if (truckProfile?.user_id !== user_id) {
      throw new AppError('It seems that you are not this truck profile owner');
    }

    // check if same user is trying to create a menu item with same name and description
    const existingMenuItem = await this.menusRepository.findAll(
      truck_id,
    );

    if (existingMenuItem) {
      const menuExists = existingMenuItem?.some(
        menu =>
          menu.title === title && menu.description === description,
      );

      if (menuExists) {
        throw new AppError(
          'You have already created a menu item with same title and description.',
        );
      }
    }

    const fileName = await this.storageProvider.saveFile(photo_filename);

    const menu = await this.menusRepository.create({
      user_id,
      truck_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename: fileName,
    });

    return menu;
  }
}

export default CreateTruckProfileService;
