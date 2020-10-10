import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dto/IFindAllUsersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  /**
   * findById
   */
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  /**
   * findByEmail
   */
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  /**
   * findAllUsers
   */
  public async findAllUsers({
    superadmin_id,
  }: IFindAllUsersDTO): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(superadmin_id),
      },
      order: {
        name: "ASC"
      }
    });
    return users;
  }

  /**
   * create
   */
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  /**
   * update
   */
  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
