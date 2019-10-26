import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class OwnerController {
  async index(req, res) {
    const owners = await User.findAll({
      where: { owner: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(owners);
  }
}

export default new OwnerController();
