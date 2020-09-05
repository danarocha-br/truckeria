import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

@injectable()
interface IRequest {
  user_id: string;
  avatarFilename: string;
  phone: number;
  city: string;
  state: string;
}

class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
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
      // delete previous avatar
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatarURL,
      );
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatarURL = avatarFilename;
    user.phone = phone;
    user.city = city;
    user.state = state;

    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateUserProfileService;
