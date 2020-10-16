import AppError from '@shared/errors/AppError';

import ListTrucksProfilesService from './ListTrucksProfilesService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '../repositories/fakes/FakeTruckProfilesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let listTrucksProfilesService: ListTrucksProfilesService;

describe('ListTrucksProfilesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    listTrucksProfilesService = new ListTrucksProfilesService(
      fakeUsersRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to list all food truck profiles for one user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile1 = await fakeTruckProfilesRepository.create({
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

    const truckProfile2 = await fakeTruckProfilesRepository.create({
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

    const truckProfileList = await listTrucksProfilesService.execute({
      user_id: user.id,
    });

    expect(truckProfileList).toEqual([truckProfile1, truckProfile2]);
  });

  it('should not be able to list food trucks profile with non-existing id', async () => {
    await expect(
      listTrucksProfilesService.execute({
        user_id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
