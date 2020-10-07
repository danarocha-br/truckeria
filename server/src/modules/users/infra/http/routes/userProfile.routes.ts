import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthentication);

userProfileRouter.get('/', userProfileController.show);
userProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  userProfileController.update,
);

export default userProfileRouter;
