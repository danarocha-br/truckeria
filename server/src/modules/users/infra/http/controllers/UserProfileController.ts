import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

class UserProfileController {
  /**
   * show
   */
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowUserProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return res.json(user);
  }

  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete user.password;

    return res.json(user);
  }
}

export default UserProfileController;
