export default interface ICreateMenuDTO {
  user_id: string;
  truck_id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  options: string[];
  photo_filename: string;
}
