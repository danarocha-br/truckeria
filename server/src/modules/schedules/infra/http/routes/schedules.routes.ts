import { Router } from 'express';

import SchedulesController from '@modules/schedules/infra/http/controllers/SchedulesController';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const schedulesRouter = Router();
const schedulesController = new SchedulesController();
schedulesRouter.use(ensureAuthentication);

schedulesRouter.get('/', schedulesController.index);

schedulesRouter.post('/', schedulesController.create);

export default schedulesRouter;
