export default interface ICreateScheduleDTO {
  user_id: string;
  name: string;
  description: string;
  cuisines: string[];
  payment_methods: string[];
  catering: boolean;
  photo_filename: string[];
  email: string;
  phone: number;
  city: string;
  state: string;
  web: string;
  instagram: string;
  facebook: string;
  twitter: string;
}
