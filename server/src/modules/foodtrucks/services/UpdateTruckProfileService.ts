import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import TruckProfile from '../infra/typeorm/entities/TruckProfile';
import ITruckProfileRepository from '../repositories/ITruckProfilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  truck_id: string;
  name: string;
  description: string;
  cuisines: string[];
  payment_methods: string[];
  catering: boolean;
  photo_filename?: string;
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
class UpdateTruckProfileService {
  constructor(
    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    truck_id,
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
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError('This food truck profile was not found.');
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

    if (photo_filename) {
      const fileName = await this.storageProvider.saveFile(photo_filename);
      truckProfile.photo_filename = fileName;
    }

    truckProfile.name = name;
    truckProfile.description = description;
    truckProfile.cuisines = cuisines;
    truckProfile.payment_methods = payment_methods;
    truckProfile.catering = catering;
    truckProfile.email = email;
    truckProfile.phone = phone;
    truckProfile.city = city;
    truckProfile.state = state;
    truckProfile.instagram = instagram;
    truckProfile.facebook = facebook;
    truckProfile.twitter = twitter;
    truckProfile.web = web;

    return this.truckProfilesRepository.update(truckProfile);
  }
}

export default UpdateTruckProfileService;
