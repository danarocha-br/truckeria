import AppError from '@shared/errors/AppError';

import CreateTruckProfileService from './CreateTruckProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '../repositories/fakes/FakeTruckProfilesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let createTruckProfile: CreateTruckProfileService;

describe('CreateTruckProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    createTruckProfile = new CreateTruckProfileService(
      fakeUsersRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to create a new truck profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const truckProfile = await createTruckProfile.execute({
      user_id: user.id,
      name: 'Brazilian Barbecue',
      description: 'Our awesome Brazilian style barbecue.',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: [''],
      email: 'barbecue@email.com',
      phone: 41985145400,
      city: 'Curitiba',
      state: 'PR',
      web: 'http://www.brazilianbbq.com',
      instagram: 'br-bbq',
      facebook: 'br-bbq',
      twitter: 'br-bbq',
    });

    expect(truckProfile).toHaveProperty('id');
    expect(truckProfile.name).toBe('Brazilian Barbecue');
  });

  it('should not be able to create a new truck profile with non-existing user', async () => {
    await expect(
      createTruckProfile.execute({
        user_id: 'non-existing-id',
        name: 'Brazilian Barbecue',
        description: 'Our awesome Brazilian style barbecue.',
        cuisines: ['brazilian', 'latin'],
        payment_methods: ['credit card'],
        catering: true,
        photo_filename: [''],
        email: 'barbecue@email.com',
        phone: 41985145400,
        city: 'Curitiba',
        state: 'PR',
        web: 'http://www.brazilianbbq.com',
        instagram: 'br-bbq',
        facebook: 'br-bbq',
        twitter: 'br-bbq',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new truck profile if user is not an admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['user'],
    });

    await expect(
      createTruckProfile.execute({
        user_id: user.id,
        name: 'Brazilian Barbecue',
        description: 'Our awesome Brazilian style barbecue.',
        cuisines: ['brazilian', 'latin'],
        payment_methods: ['credit card'],
        catering: true,
        photo_filename: [''],
        email: 'barbecue@email.com',
        phone: 41985145400,
        city: 'Curitiba',
        state: 'PR',
        web: 'http://www.brazilianbbq.com',
        instagram: 'br-bbq',
        facebook: 'br-bbq',
        twitter: 'br-bbq',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new truck profile from the same user for same name and city/state', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin'],
    });

    await createTruckProfile.execute({
      user_id: user.id,
      name: 'Brazilian Barbecue',
      description: 'Our awesome Brazilian style barbecue.',
      cuisines: ['brazilian', 'latin'],
      payment_methods: ['credit card'],
      catering: true,
      photo_filename: [''],
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
      createTruckProfile.execute({
        user_id: user.id,
        name: 'Brazilian Barbecue',
        description: 'Our awesome Brazilian style barbecue.',
        cuisines: ['brazilian', 'latin'],
        payment_methods: ['credit card'],
        catering: true,
        photo_filename: [''],
        email: 'barbecue@email.com',
        phone: 41985145400,
        city: 'Curitiba',
        state: 'PR',
        web: 'http://www.brazilianbbq.com',
        instagram: 'br-bbq',
        facebook: 'br-bbq',
        twitter: 'br-bbq',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
