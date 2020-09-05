import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';

class UserAdditionalDataController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { phone, city, state } = req.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
      phone,
      city,
      state,
    });

    delete user.password;

    return res.json(user);
  }
}

export default UserAdditionalDataController;
