import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
  phone: number;
  city: string;
  state: string;
}

class UpdateUserProfileService {
  public async execute({
    user_id,
    avatarFilename,
    phone,
    city,
    state,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserProfileService;
