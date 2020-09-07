import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import uploadConfig from '@config/upload';

import TrucksProfilesController from '../controllers/TrucksProfilesController';

const upload = multer(uploadConfig);
const trucksProfilesRouter = Router();
const trucksProfilesController = new TrucksProfilesController();

trucksProfilesRouter.use(ensureAuthentication);

trucksProfilesRouter.get('/', trucksProfilesController.index);
trucksProfilesRouter.post(
  '/',
  upload.single('photo_filename'),
  trucksProfilesController.create,
);

export default trucksProfilesRouter;
