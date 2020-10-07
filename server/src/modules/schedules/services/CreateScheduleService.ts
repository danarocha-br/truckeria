import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
  user_id: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}

@injectable()
class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfileRepository,
  ) {}

  public async execute({
    truck_id,
    user_id,
    city,
    state,
    lat,
    lon,
    date_end,
    date_start,
  }: IRequest): Promise<Schedule> {
    //check if truckprofile exist
    const truckProfile = await this.truckProfilesRepository.findById(truck_id);

    if (!truckProfile) {
      throw new AppError('This truck profile does not exist.');
    }

    //check if the user is truckprofile owner
    if (truckProfile?.user_id !== user_id) {
      throw new AppError('It seems that you are not this truck profile owner');
    }

    //check if same start date and end date matches the location and this combination is already existent
    const listAllSchedules = await this.schedulesRepository.findAllSchedules(
      truck_id,
    );

    if (listAllSchedules?.length) {
      const scheduleExists = listAllSchedules.some(
        schedule =>
          schedule.lat === lat &&
          schedule.lon === lon &&
          schedule.date_start === date_start,
      );

      if (scheduleExists) {
        throw new AppError(
          'You have already created a scheule for this same time and location.',
        );
      }
    }

    // check if schedule is not in past date
    const currentDate = new Date(Date.now());

    const isPastDate = isBefore(date_start, currentDate);

    if (isPastDate) {
      throw new AppError(
        `Cannot create schedules in past date, please choose a current or future date.`,
      );
    }

    // check if end date is not before the start date

    const isEndDateBefore = isBefore(date_end, currentDate);

    if (isEndDateBefore) {
      throw new AppError(`End date must be after the start date.`);
    }

    const schedule = await this.schedulesRepository.create({
      user_id,
      truck_id,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    return schedule;
  }
}

export default CreateScheduleService;
