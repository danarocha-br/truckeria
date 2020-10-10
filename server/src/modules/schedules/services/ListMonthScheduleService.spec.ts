import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import ListMonthSchedule from './ListMonthScheduleService';

let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let listMonthSchedule: ListMonthSchedule;

describe('ListMonthSchedule', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    listMonthSchedule = new ListMonthSchedule(
      fakeTruckProfilesRepository,
      fakeSchedulesRepository,
    );
  });

  it('should be able to list a month schedule for a truck profile', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 10, 1, 11).getTime();
    });

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
      city: 'Los Angeles',
      state: 'CA',
      lat: '54567',
      lon: '879548',
      date_start: new Date(2020, 10, 21, 8, 0, 0),
      date_end: new Date(2020, 10, 21, 18, 0, 0),
    });
    const schedule3 = await fakeSchedulesRepository.create({
      user_id: 'user.id',
      truck_id: truckProfile.id,
      city: 'Los Angeles',
      state: 'CA',
      lat: '54567',
      lon: '879548',
      date_start: new Date(2020, 11, 21, 8, 0, 0),
      date_end: new Date(2020, 11, 21, 18, 0, 0),
    });

    const listSchedules = await listMonthSchedule.execute({
      truck_id: truckProfile.id,
      month: 11,
      year: 2020,
    });

    expect(listSchedules).toEqual([schedule1, schedule2]);
  });

  it('should not list schedules for a non-existing id', async () => {
    await expect(
      listMonthSchedule.execute({
        truck_id: 'non-existing.id',
        month: 5,
        year: 2020,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not list schedules for a past date', async () => {
  //   jest.spyOn(Date, 'now').mockImplementation(() => {
  //     return new Date(2020, 10, 1, 11).getTime();
  //   });

  //   const truckProfile = await fakeTruckProfilesRepository.create({
  //     user_id: 'user.id',
  //     name: 'Mexican Barbecue',
  //     description: 'Our awesome Mexican style barbecue.',
  //     cuisines: ['mexican', 'latin'],
  //     payment_methods: ['credit card'],
  //     catering: true,
  //     photo_filename: '',
  //     email: 'barbecue@email.com',
  //     phone: 41985145400,
  //     city: 'Curitiba',
  //     state: 'PR',
  //     web: 'http://www.mexicanbbq.com',
  //     instagram: 'br-bbq',
  //     facebook: 'br-bbq',
  //     twitter: 'br-bbq',
  //   });

  //   await fakeSchedulesRepository.create({
  //     user_id: 'user.id',
  //     truck_id: truckProfile.id,
  //     city: 'Los Angeles',
  //     state: 'CA',
  //     lat: '123456',
  //     lon: '123456',
  //     date_start: new Date(2020, 4, 20, 8, 0, 0),
  //     date_end: new Date(2020, 4, 20, 18, 0, 0),
  //   });

  //   await expect(
  //     listMonthSchedule.execute({
  //       truck_id: truckProfile.id,
  //       month: 5,
  //       year: 2020,
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
