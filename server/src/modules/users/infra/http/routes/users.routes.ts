import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import UsersController from '../controllers/UsersController';
import UserAdditionalDataController from '../controllers/UserAdditionalDataController';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const userAdditionalDataController = new UserAdditionalDataController();
const upload = multer(uploadConfig);

usersRouter.get('/', ensureAuthentication, usersController.index);
usersRouter.post('/', usersController.create);
usersRouter.put(
  '/profile',
  ensureAuthentication,
  upload.single('avatarURL'),
  userAdditionalDataController.update,
);

export default usersRouter;
