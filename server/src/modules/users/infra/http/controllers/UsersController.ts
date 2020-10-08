import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '../../../services/ListAllUsersService';

class UsersController {
  /**
   * Show all users
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const usersList = container.resolve(ListAllUsersService);

    const users = await usersList.execute({
      user_id,
    });

    return res.json(classToClass(users));
  }

  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return res.json(classToClass(user));
  }
}

export default UsersController;
