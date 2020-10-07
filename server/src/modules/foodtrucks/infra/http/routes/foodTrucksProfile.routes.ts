import { Router } from 'express';
import multer from 'multer';
// import { celebrate, Segments, Joi } from 'celebrate';

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
  // celebrate({
  //   [Segments.BODY]: {
  //     photo_filename: Joi.string().required(),
  //     name: Joi.string().required(),
  //     description: Joi.string(),
  //     cuisines: Joi.array().items(Joi.string().required()),
  //     payment_methods: Joi.array().items(Joi.string().required()),
  //     catering: Joi.boolean().required(),
  //     email: Joi.string().email().required(),
  //     phone: Joi.number(),
  //     city: Joi.string().required(),
  //     state: Joi.string().required(),
  //     web: Joi.string(),
  //     instagram: Joi.string(),
  //     facebook: Joi.string(),
  //     twitter: Joi.string(),
  //   },
  // }),
  upload.single('photo_filename'),
  truckProfileController.create,
);
trucksProfilesRouter.put(
  '/',
  upload.single('photo_filename'),
  truckProfileController.update,
);
trucksProfilesRouter.delete('/', truckProfileController.delete);

export default trucksProfilesRouter;
