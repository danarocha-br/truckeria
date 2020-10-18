import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';
import FakeTruckProfilesRepository from '@modules/foodtrucks/repositories/fakes/FakeTruckProfilesRepository';
import CreateScheduleService from './CreateScheduleService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeTruckProfilesRepository: FakeTruckProfilesRepository;
let createSchedule: CreateScheduleService;

describe('CreateSchedule', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeTruckProfilesRepository = new FakeTruckProfilesRepository();

    createSchedule = new CreateScheduleService(
      fakeSchedulesRepository,
      fakeTruckProfilesRepository,
    );
  });

  it('should be able to create a new schedule item', async () => {
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

    const schedule = await createSchedule.execute({
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

    expect(schedule).toHaveProperty('id');
    expect(schedule.truck_id).toBe(truckProfile.id);
  });

  it('should not be able to create a schedule for a non-existing truck profile', async () => {
    const scheduleStartDate = new Date(2020, 10, 10, 11);

    await expect(
      createSchedule.execute({
        user_id: 'sm',
        truck_id: '123456',
        address: 'Avenue 104',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a schedule for a truck profile that doesnt belong to the logged user', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 12, 1, 11).getTime();
    });

    const scheduleStartDate = new Date(2020, 12, 10, 11);

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

    await expect(
      createSchedule.execute({
        user_id: 'user.id',
        truck_id: truckProfile.id,
        address: 'Avenue 104',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: new Date(2020, 12, 11, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a schedule for same starting date and lat/lon', async () => {
    const scheduleStartDate = new Date(2020, 10, 10, 11);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 10, 1, 11).getTime();
    });

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

    await createSchedule.execute({
      user_id: user.id,
      truck_id: truckProfile.id,
      city: 'Los Angeles',
      state: 'CA',
      address: 'Avenue 104',
      lat: '123456',
      lon: '123456',
      date_start: scheduleStartDate,
      date_end: scheduleStartDate,
    });

    await expect(
      createSchedule.execute({
        user_id: user.id,
        truck_id: truckProfile.id,
        address: 'Avenue 104',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a schedule for a past date', async () => {
    const scheduleStartDate = new Date(2020, 5, 10, 11);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 1, 11).getTime();
    });

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

    await expect(
      createSchedule.execute({
        user_id: user.id,
        truck_id: truckProfile.id,
        address: 'Avenue 104',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a schedule if end date is before start date', async () => {
    const scheduleStartDate = new Date(2020, 11, 10, 11);
    const scheduleEndDate = new Date(2020, 10, 10, 10);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 1, 11).getTime();
    });

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

    await expect(
      createSchedule.execute({
        user_id: user.id,
        truck_id: truckProfile.id,
        address: 'Avenue 104',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: scheduleEndDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
