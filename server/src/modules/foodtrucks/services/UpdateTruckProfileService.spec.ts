import AppError from '@shared/errors/AppError';

import UpdateTruckProfileService from './UpdateTruckProfileService';
import FakeTruckProfilesRepository from '../repositories/fakes/FakeTruckProfilesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let updateTruckProfile: UpdateTruckProfileService;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateTruckProfile', () => {
  beforeEach(() => {
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateTruckProfile = new UpdateTruckProfileService(
      fakeTruckProfilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update a truck profile', async () => {
    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: 'some_user_id',
      name: 'Brazilian Barbecue',
      description: 'Our awesome Brazilian style barbecue.',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.brazilianbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    const updatedProfile = await updateTruckProfile.execute({
      user_id: 'some_user_id',
      truck_id: truckProfile.id,
      name: 'Mexican FoodTruck',
      description: 'teste',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: '',
      phone: 41985145400,
      city: '',
      state: '',
      web: '',
      instagram: '',
      facebook: '',
      twitter: '',
    });

    expect(updatedProfile.name).toBe('Mexican FoodTruck');
    expect(updatedProfile.description).toBe('teste');
  });

  it('should be able to update a truck profile photo image', async () => {
    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: 'some_user_id',
      name: 'Brazilian Barbecue',
      description: 'Our awesome Brazilian style barbecue.',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: 'some-photo',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.brazilianbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    const updatedProfile = await updateTruckProfile.execute({
      user_id: 'some_user_id',
      truck_id: truckProfile.id,
      name: 'Mexican FoodTruck',
      description: 'teste',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: 'another_photo',
      email: '',
      phone: 41985145400,
      city: '',
      state: '',
      web: '',
      instagram: '',
      facebook: '',
      twitter: '',
    });

    expect(updatedProfile.photo_filename).toBe('another_photo');
  });

  it('should not be able to update a truck profile with a non-existing truck_id', async () => {
    await expect(
      updateTruckProfile.execute({
        user_id: 'some_user_id',
        truck_id: 'non-existing',
        name: 'Mexican FoodTruck',
        description: 'teste',
        cuisines: ['brazilian', 'latin'],
        payment_methods: ['credit card'],
        catering: true,
        photo_filename: '',
        email: '',
        phone: 41985145400,
        city: '',
        state: '',
        web: '',
        instagram: '',
        facebook: '',
        twitter: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a truck profile with an existing name and city', async () => {
    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: 'some_user_id',
      name: 'Brazilian Barbecue',
      description: 'Our awesome Brazilian style barbecue.',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.brazilianbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    await expect(
      updateTruckProfile.execute({
        user_id: 'some_user_id',
        truck_id: truckProfile.id,
        name: 'Brazilian Barbecue',
        description: 'teste',
        cuisines: ['brazilian', 'latin'],
        payment_methods: ['credit card'],
        catering: true,
        photo_filename: '',
        email: '',
        phone: 41985145400,
        city: 'Curitiba',
        state: '',
        web: '',
        instagram: '',
        facebook: '',
        twitter: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
