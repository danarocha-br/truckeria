import Schedule from '../infra/typeorm/entities/Schedule';
import SchedulesRepository from '../repositories/SchedulesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  truckId: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}

class CreateScheduleService {
  private schedulesRepository: SchedulesRepository;

  constructor(schedulesRepository: SchedulesRepository) {
    this.schedulesRepository = schedulesRepository;
  }

  public execute({
    truckId,
    city,
    state,
    lat,
    lon,
    date_end,
    date_start,
  }: Request): Schedule {
    const isScheduleInSameDateAndTime = this.schedulesRepository.findByDate(
      date_start,
    );

    if (isScheduleInSameDateAndTime) {
      throw new AppError(
        'This start time is already booked for this same location.',
      );
    }

    const newSchedule = this.schedulesRepository.create({
      truckId,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    return newSchedule;
  }
}

export default CreateScheduleService;
