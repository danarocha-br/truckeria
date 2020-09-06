import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

import TrucksProfilesController from '../controllers/TrucksProfilesController';

const trucksProfilesRouter = Router();
const trucksProfilesController = new TrucksProfilesController();

trucksProfilesRouter.use(ensureAuthentication);

trucksProfilesRouter.get('/', trucksProfilesController.index);
trucksProfilesRouter.post('/', trucksProfilesController.create);

export default trucksProfilesRouter;
