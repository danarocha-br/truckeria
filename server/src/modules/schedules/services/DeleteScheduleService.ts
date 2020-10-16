import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import ITruckProfileRepository from '@modules/foodtrucks/repositories/ITruckProfilesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  schedule_id: string;
  user_id: string;
}

@injectable()
class UpdateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('TruckProfilesRepository')
    private truckProfilesRepository: ITruckProfileRepository,

  ) {}

  public async execute({
    schedule_id,
    user_id,
  }: IRequest): Promise<Schedule[] | DeleteResult> {
    //check if schedule exist
    const schedule = await this.schedulesRepository.findById(schedule_id);

    if (!schedule) {
      throw new AppError('This schedule does not exist.');
    }

    const truckProfile = await this.truckProfilesRepository.findById(schedule.truck_id);

    //check if the user is truckprofile owner
    if (truckProfile?.user_id !== user_id) {
      throw new AppError('It seems that you are not this truck profile owner');
    }


    return this.schedulesRepository.delete(schedule.id);
  }
}

export default UpdateScheduleService;
