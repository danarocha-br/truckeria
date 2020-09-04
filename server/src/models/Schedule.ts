import { uuid } from "uuidv4";

interface ScheduleConstructor {
  id: string;
  truckId: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}

class Schedule {
  id: string;

  truckId: string;

  city: string;

  state: string;

  lat: string;

  lon: string;

  date_start: Date;

  date_end: Date;

  constructor({truckId, city, state, lat, lon, date_start, date_end}: Omit<ScheduleConstructor, 'id'> ){
    this.id = uuid();
    this.truckId = truckId;
    this.city = city;
    this.state = state;
    this.lat = lat;
    this.lon = lon;
    this.date_start: date_start;
    this.date_end: date_end;
  }
}

export default Schedule;
