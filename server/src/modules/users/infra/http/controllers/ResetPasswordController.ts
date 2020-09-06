import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ForgotPasswordController {
  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ password, token });

    return res.status(204).json();
  }
}

export default ForgotPasswordController;
