import AppError from '@shared/errors/AppError';

import ListAllMenusByTypeService from './ListAllMenusByTypeService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import FakeMenusRepository from '../repositories/fakes/FakeMenusRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let fakeMenusRepository: FakeMenusRepository;
let listAllMenusByTypeService: ListAllMenusByTypeService;

describe('ListTrucksProfilesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();
    fakeMenusRepository = new FakeMenusRepository();

    listAllMenusByTypeService = new ListAllMenusByTypeService(
      fakeMenusRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to list all menu items for one truck profile by a certain type', async () => {
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

    const menu1 = await fakeMenusRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'salad',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    const menu2 = await fakeMenusRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      title: 'Burger',
      description: 'Veggies and chicken',
      type: 'burger',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    const menuList = await listAllMenusByTypeService.execute({
      truck_id: truckProfile.id,
      type: 'salad'
    });

    expect(menuList).toEqual([menu1]);
  });

  it('should not be able to list menu items with non-existing id', async () => {
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

    await fakeMenusRepository.create({
      user_id: 'user.id',
      truck_id: truckProfile.id,
      title: 'Salad Bowl',
      description: 'Veggies and chicken',
      type: 'Salad',
      options: ['vegan, vegetarian'],
      photo_filename: '',
      price: 7
    });

    await expect(
      listAllMenusByTypeService.execute({
        truck_id: 'wrong-id',
        type: 'Burger'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
