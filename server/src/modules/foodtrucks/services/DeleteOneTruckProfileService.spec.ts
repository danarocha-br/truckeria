import AppError from '@shared/errors/AppError';

import DeleteOneTruckProfileService from './DeleteOneTruckProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '../repositories/fakes/FakeTruckProfilesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let deleteOneTruckProfileService: DeleteOneTruckProfileService;

describe('DeleteOneTruckProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    deleteOneTruckProfileService = new DeleteOneTruckProfileService(
      fakeUsersRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to delete a food truck profile when given a valid ID', async () => {
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

    const deleteProfile = await deleteOneTruckProfileService.execute({
      user_id: user.id,
      truck_id: truckProfile.id,
    });

    // expect(deleteProfile).
  });
});
