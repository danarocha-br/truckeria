import AppError from '@shared/errors/AppError';

import FakeMenusRepository from '../repositories/fakes/FakeMenusRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import UpdateMenuService from './UpdateMenuService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeMenusRepository: FakeMenusRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let updateMenuService: UpdateMenuService;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateMenu', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMenusRepository = new FakeMenusRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateMenuService = new UpdateMenuService(
      fakeMenusRepository,
      fakeTruckProfilesRepository,
      fakeStorageProvider
    );
  });

  it('should be able to update a menu item', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: user.id,
      name: 'Mexican Barbecue',
      description: 'Our awesome Mexican style barbecue.',
      cuisines: ['mexican', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.mexicanbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    const menu = await fakeMenusRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Salad',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    await updateMenuService.execute({
      user_id: user.id,
      truck_id: truckProfile.id,
      menu_id: menu.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Burger',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    })

    expect(menu.type).toBe('Burger');
  });

  it('should not be able to update a menu item for a non-existing menu id', async () => {

    await expect(
      updateMenuService.execute({
      user_id: 'user.id',
      truck_id: 'truckProfile.id',
      menu_id: 'fake-id',
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Burger',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a menu item for a truck profile that doesnt belong to the logged user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: user.id,
      name: 'Mexican Barbecue',
      description: 'Our awesome Mexican style barbecue.',
      cuisines: ['mexican', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.mexicanbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    const menu = await fakeMenusRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Burger',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    await expect(
      updateMenuService.execute({
        user_id: 'user.id',
        truck_id: truckProfile.id,
        menu_id: menu.id,
        title: 'Salad Bowl',
        description: 'Veggies and chicken',
        type: 'Burger',
        options: ['vegan, vegetarian'],
        photo_filename: '',
        price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a menu item if another item has same title and description', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: user.id,
      name: 'Mexican Barbecue',
      description: 'Our awesome Mexican style barbecue.',
      cuisines: ['mexican', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: '',
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.mexicanbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    await fakeMenusRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Burger',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    await expect(
      updateMenuService.execute({
        user_id: user.id,
        truck_id: truckProfile.id,
        menu_id: 'another-id',
        title: 'Salad Bowl',
        description: 'Veggies and chicken',
        type: 'Burger',
        options: ['vegan, vegetarian'],
        photo_filename: '',
        price: 7
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
