import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import DeleteScheduleService from './DeleteScheduleService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let deleteSchedule: DeleteScheduleService;

describe('DeleteSchedule', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSchedulesRepository = new FakeSchedulesRepository();

    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    deleteSchedule = new DeleteScheduleService(
      fakeSchedulesRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to delete schedule item', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 1, 11).getTime();
    });

    const scheduleStartDate = new Date(2020, 11, 10, 11);

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

    const schedule = await fakeSchedulesRepository.create({
      user_id: user.id,
      truck_id: truckProfile.id,
      address: 'Avenue 104',
      city: 'Los Angeles',
      state: 'CA',
      lat: '123456',
      lon: '123456',
      date_start: scheduleStartDate,
      date_end: scheduleStartDate,
    });

    await deleteSchedule.execute({
      schedule_id: schedule.id,
    })

    expect(schedule.address).toBe('Avenue 108');
  });

  it('should not be able to delete a schedule for a non-existing schedule id', async () => {

    await expect(
      deleteSchedule.execute({
        schedule_id: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });


});
