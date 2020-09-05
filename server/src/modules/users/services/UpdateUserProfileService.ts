import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarURL: string;
  phone: number;
  city: string;
  state: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarURL,
    phone,
    city,
    state,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can update profile data.',
        401,
      );
    }

    if (user.avatarURL) {
      await this.storageProvider.deleteFile(user.avatarURL);
    }

    const fileName = await this.storageProvider.saveFile(avatarURL);

    user.avatarURL = fileName;
    user.phone = phone;
    user.city = city;
    user.state = state;

    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateUserProfileService;
