import { Router } from 'express';

import SchedulesController from '@modules/schedules/infra/http/controllers/SchedulesController';
import MonthlyScheduleController from '@modules/schedules/infra/http/controllers/MonthlyScheduleController';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const schedulesRouter = Router();
const schedulesController = new SchedulesController();
const monthlyScheduleController = new MonthlyScheduleController();

schedulesRouter.use(ensureAuthentication);
schedulesRouter.use(ensureAuthentication);

schedulesRouter.get('/:truck_id/all', schedulesController.index);
schedulesRouter.get('/:truck_id/month', monthlyScheduleController.index);

schedulesRouter.post('/', schedulesController.create);

export default schedulesRouter;
