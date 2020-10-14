import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import ListSchedulesService from './ListSchedulesService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let listSchedulesService: ListSchedulesService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListSchedulesService', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listSchedulesService = new ListSchedulesService(
      fakeTruckProfilesRepository,
      fakeSchedulesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list schedules for a truck profile', async () => {
    const truckProfile = await fakeTruckProfilesRepository.create({
      user_id: 'user.id',
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

    const schedule1 = await fakeSchedulesRepository.create({
      user_id: 'user.id',
      truck_id: truckProfile.id,
      address: 'Avenue 104',
      city: 'Los Angeles',
      state: 'CA',
      lat: '123456',
      lon: '123456',
      date_start: new Date(2020, 10, 20, 8, 0, 0),
      date_end: new Date(2020, 10, 20, 18, 0, 0),
    });
    const schedule2 = await fakeSchedulesRepository.create({
      user_id: 'user.id',
      truck_id: truckProfile.id,
      address: 'Avenue 104',
      city: 'Los Angeles',
      state: 'CA',
      lat: '54567',
      lon: '879548',
      date_start: new Date(2020, 10, 21, 8, 0, 0),
      date_end: new Date(2020, 10, 21, 18, 0, 0),
    });

    const listSchedules = await listSchedulesService.execute({
      truck_id: truckProfile.id,
    });

    expect(listSchedules).toEqual([schedule1, schedule2]);
  });

  it('should not list schedules for a non-existing id', async () => {
    await expect(
      listSchedulesService.execute({
        truck_id: 'non-existing.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
