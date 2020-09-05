import { uuid } from 'uuidv4';

interface ScheduleConstructor {
  id: string;
  truck_id: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}

class Schedule {
  id: string;

  truck_id: string;

  city: string;

  state: string;

  lat: string;

  lon: string;

  date_start: Date;

  date_end: Date;

  constructor({
    truck_id,
    city,
    state,
    lat,
    lon,
    date_start,
    date_end,
  }: Omit<ScheduleConstructor, 'id'>) {
    this.id = uuid();
    this.truck_id = truck_id;
    this.city = city;
    this.state = state;
    this.lat = lat;
    this.lon = lon;
    this.date_start = date_start;
    this.date_end = date_end;
  }
}

export default Schedule;
