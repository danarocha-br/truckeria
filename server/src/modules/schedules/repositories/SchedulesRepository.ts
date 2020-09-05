import Schedule from '../infra/typeorm/entities/Schedule';
import { isEqual } from 'date-fns';

interface CreateScheduleDTO {
  truckId: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}

class SchedulesRepository {
  private schedules: Schedule[];

  constructor() {
    this.schedules = [];
  }

  public all(): Schedule[] {
    return this.schedules;
  }

  public findByDate(date_start: Date): Schedule | null {
    const isScheduleInSameDateAndTime = this.schedules.find(schedule =>
      isEqual(date_start, schedule.date_start),
    );

    return isScheduleInSameDateAndTime || null;
  }

  public create({
    truckId,
    city,
    state,
    lat,
    lon,
    date_start,
    date_end,
  }: CreateScheduleDTO) {
    const newSchedule = new Schedule({
      truckId,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    this.schedules.push(newSchedule);

    return newSchedule;
  }
}

export default SchedulesRepository;
