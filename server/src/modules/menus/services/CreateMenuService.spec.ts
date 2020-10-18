import AppError from '@shared/errors/AppError';

import CreateMenuService from './CreateMenuService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeMenusRepository from '../repositories/fakes/FakeMenusRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createMenuService: CreateMenuService;
let fakeMenusRepository: FakeMenusRepository;

describe('CreateTruckProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeMenusRepository = new FakeMenusRepository();

    createMenuService = new CreateMenuService(
      fakeTruckProfilesRepository,
      fakeMenusRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new menu item', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: user.id,
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

    const menu = await createMenuService.execute({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Salad',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    expect(menu).toHaveProperty('id');
    expect(menu.title).toBe('Salad Bowl');
  });

  it('should not be able to create a menu item with non-existing truck_id', async () => {
    await expect(
      createMenuService.execute({
        user_id: 'non-existing-id',
        truck_id: 'non-existing-id',
        title: 'Salad Bowl',
        description: 'Veggies and chicken',
        type: 'Salad',
        options: ['vegan, vegetarian'],
        photo_filename: '',
        price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a menu item with a user that doesnt own truck profile', async () => {
    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: 'user.id',
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
      createMenuService.execute({
        user_id: 'non-existing-id',
        truck_id: truckProfile.id,
        title: 'Salad Bowl',
        description: 'Veggies and chicken',
        type: 'Salad',
        options: ['vegan, vegetarian'],
        photo_filename: '',
        price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a menu item with same title and description', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: user.id,
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

    await createMenuService.execute({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Salad',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    })

    await expect(
      createMenuService.execute({
        user_id: user.id,
        truck_id: truckProfile.id,
        title: 'Salad Bowl',
        description: 'Veggies and chicken',
        type: 'Salad',
        options: ['vegan, vegetarian'],
        photo_filename: '',
        price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
