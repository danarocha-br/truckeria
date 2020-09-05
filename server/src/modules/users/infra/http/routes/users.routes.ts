import { Router } from 'express';
import multer from 'multer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.put(
  '/profile',
  ensureAuthentication,
  upload.single('avatarURL'),
  async (req, res) => {
    try {
      const { phone, city, state } = req.body;

      const usersRepository = new UsersRepository();

      const updateUserProfile = new UpdateUserProfileService(usersRepository);

      const user = await updateUserProfile.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
        phone,
        city,
        state,
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
