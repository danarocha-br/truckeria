import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    roles,
  }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('This e-mail address is already being used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const adminRole = ['user', roles];

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: adminRole,
    });

    return user;
  }
}

export default CreateUserService;
