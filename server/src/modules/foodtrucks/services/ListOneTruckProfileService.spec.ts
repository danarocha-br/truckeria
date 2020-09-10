import AppError from '@shared/errors/AppError';

import ListOneTruckProfileService from './ListOneTruckProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTruckProfilesRepository from '../repositories/fakes/FakeTruckProfilesRepository';

let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let listOneTruckProfileService: ListOneTruckProfileService;

describe('ListOneTruckProfileService', () => {
  beforeEach(() => {
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    listOneTruckProfileService = new ListOneTruckProfileService(
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to list one food truck profile', async () => {
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

    const truckProfileList = await listOneTruckProfileService.execute({
      truck_id: truckProfile.id,
    });

    expect(truckProfileList).toEqual(truckProfile);
  });

  it('should not be able to list food truck profile with non-existing id', async () => {
    await expect(
      listOneTruckProfileService.execute({
        truck_id: 'truckProfile.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
