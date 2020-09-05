import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import uploadConfig from '../config/upload';
import UpdateUserProfileService from '../services/UpdateUserProfileService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

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

      const updateUserProfile = new UpdateUserProfileService();

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
