import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  /**
   * execute
   */
  public async execute({ user_id }: IRequest): Promise<User[] | undefined> {
    // check if user is superadmin
    const userRequest = await this.usersRepository.findById(user_id);

    const isUserSuperAdmin = userRequest?.roles.includes('superadmin');

    if (!isUserSuperAdmin) {
      throw new AppError(`Only super admin users can access this data.`);
    }

    const users = await this.usersRepository.findAllUsers({
      superadmin_id: user_id,
    });

    if (!user_id) {
      throw new AppError(`You cannot access this data.`);
    }

    return users;
  }
}

export default ListAllUsersService;
