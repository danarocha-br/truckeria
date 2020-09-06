import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthentication);

userProfileRouter.put('/', userProfileController.update);
userProfileRouter.get('/', userProfileController.show);

export default userProfileRouter;
