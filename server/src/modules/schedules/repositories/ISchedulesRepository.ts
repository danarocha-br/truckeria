import Schedule from '../infra/typeorm/entities/Schedule';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';
import IFindAllSchedulesWithinIntervalDTO from '../dtos/IFindAllSchedulesWithinIntervalDTO';

export default interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  findByDate(date_start: Date): Promise<Schedule | undefined>;
  listAllSchedules(truck_id: string): Promise<Schedule[] | undefined>;
  findAllSchedulesWithinInterval(
    data: IFindAllSchedulesWithinIntervalDTO,
  ): Promise<Schedule[] | undefined>;
}
