import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import TruckProfile from '../infra/typeorm/entities/TruckProfile';
import ITruckProfileRepository from '../repositories/ITruckProfilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  description: string;
  cuisines: string[];
  payment_methods: string[];
  catering: boolean;
  photo_filename: string;
  email: string;
  phone: number;
  city: string;
  state: string;
  web: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

@injectable()
class CreateTruckProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<TruckProfile> {
    // find user
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user does not exist.');
    }
    // check if this user is an admin user
    if (!user.roles.includes('admin')) {
      throw new AppError('Only admin users can create a food truck profile.');
    }

    // check if same user is trying to create a truck profile with same name and city/state
    const existingTrucksProfile = await this.truckProfilesRepository.findAllMyTrucksProfile(
      user_id,
    );

    if (existingTrucksProfile) {
      const truckProfileExists = existingTrucksProfile?.some(
        truckProfile =>
          truckProfile.name === name && truckProfile.city === city,
      );

      if (truckProfileExists) {
        throw new AppError(
          'You have already created a food truck profile with this same name and location.',
        );
      }
    }

    const fileName = await this.storageProvider.saveFile(photo_filename);

    const truckProfile = await this.truckProfilesRepository.create({
      user_id: user.id,
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      photo_filename: fileName,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    });

    return truckProfile;
  }
}

export default CreateTruckProfileService;
