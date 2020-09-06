import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateExtraDataToUserProfileService from '@modules/users/services/UpdateExtraDataToUserProfileService';

class UserAdditionalDataController {
  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const { phone, city, state } = req.body;

    const updateExtraDataToUserProfile = container.resolve(
      UpdateExtraDataToUserProfileService,
    );

    const user = await updateExtraDataToUserProfile.execute({
      user_id: req.user.id,
      avatarURL: req.file.filename,
      phone,
      city,
      state,
    });

    delete user.password;

    return res.json(user);
  }
}

export default UserAdditionalDataController;
