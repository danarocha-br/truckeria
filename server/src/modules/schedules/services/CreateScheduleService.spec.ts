import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';
import CreateScheduleService from './CreateScheduleService';

let fakeSchedulesRepository: FakeSchedulesRepository;
let createSchedule: CreateScheduleService;

describe('CreateSchedule', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();
    createSchedule = new CreateScheduleService(fakeSchedulesRepository);
  });

  it('should be able to create a new schedule item', async () => {
    const schedule = await createSchedule.execute({
      truck_id: '123456',
      city: 'Los Angeles',
      state: 'CA',
      lat: '123456',
      lon: '123456',
      date_start: new Date(),
      date_end: new Date(),
    });

    expect(schedule).toHaveProperty('id');
    expect(schedule.truck_id).toBe('123456');
  });

  it('should not be able to create two schedule items at same time and location for one food truck profile', async () => {
    const scheduleStartDate = new Date(2020, 10, 10, 11);

    await createSchedule.execute({
      truck_id: '123456',
      city: 'Los Angeles',
      state: 'CA',
      lat: '123456',
      lon: '123456',
      date_start: scheduleStartDate,
      date_end: new Date(),
    });

    expect(
      createSchedule.execute({
        truck_id: '123456',
        city: 'Los Angeles',
        state: 'CA',
        lat: '123456',
        lon: '123456',
        date_start: scheduleStartDate,
        date_end: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
