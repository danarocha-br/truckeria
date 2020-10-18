import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import uploadConfig from '@config/upload';

import MenusController from '../controllers/MenusController';
import MenusTypesController from '../controllers/MenusTypesController';

const upload = multer(uploadConfig);
const menusRouter = Router();
const menusController = new MenusController();
const menusTypesController = new MenusTypesController();

menusRouter.use(ensureAuthentication);

menusRouter.get(
  '/:truck_id',
  celebrate({
    [Segments.PARAMS]: {
      truck_id: Joi.string().uuid().required(),
    },
  }),
  menusController.index,
);

menusRouter.post(
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
  menusController.create,
);

menusRouter.put(
  '/',
  upload.single('photo_filename'),
  menusController.update,
);


menusRouter.delete(
  '/:menu_id',
  celebrate({
    [Segments.PARAMS]: {
      menu_id: Joi.string().uuid().required(),
    },
  }),
  menusController.delete,
);

menusRouter.get(
  '/:truck_id/type',
  celebrate({
    [Segments.PARAMS]: {
      truck_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      type: Joi.string().required(),
    }
  }),
  menusTypesController.index,
);

export default menusRouter;
