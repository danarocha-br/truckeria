import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import IFindAllUsersDTO from '../dto/IFindAllUsersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllUsers(data: IFindAllUsersDTO): Promise<User[] | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
}
