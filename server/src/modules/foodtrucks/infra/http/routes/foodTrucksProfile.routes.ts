import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import uploadConfig from '@config/upload';

import TrucksProfilesController from '../controllers/TrucksProfilesController';
import TruckProfileController from '../controllers/TruckProfileController';

const upload = multer(uploadConfig);
const trucksProfilesRouter = Router();
const trucksProfilesController = new TrucksProfilesController();
const truckProfileController = new TruckProfileController();

trucksProfilesRouter.use(ensureAuthentication);

trucksProfilesRouter.get('/', trucksProfilesController.index);
trucksProfilesRouter.get('/single', truckProfileController.index);
trucksProfilesRouter.post(
  '/',
  upload.single('photo_filename'),
  truckProfileController.create,
);
trucksProfilesRouter.put(
  '/',
  upload.single('photo_filename'),
  truckProfileController.update,
);

export default trucksProfilesRouter;
