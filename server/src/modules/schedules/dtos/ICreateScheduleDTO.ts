export default interface ICreateScheduleDTO {
  truck_id: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  date_start: Date;
  date_end: Date;
}
