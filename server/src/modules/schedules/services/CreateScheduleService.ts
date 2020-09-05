import { injectable, inject } from 'tsyringe';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  truck_id: string;
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
  ) {}

  public async execute({
    truck_id,
    city,
    state,
    lat,
    lon,
    date_end,
    date_start,
  }: IRequest): Promise<Schedule> {
    const isScheduleInSameDateAndTime = await this.schedulesRepository.findByDate(
      date_start,
    );

    if (isScheduleInSameDateAndTime) {
      throw new AppError(
        'This start time is already booked for this same location.',
      );
    }

    const schedule = await this.schedulesRepository.create({
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
