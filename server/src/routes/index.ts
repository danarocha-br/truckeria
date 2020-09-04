import { Router } from 'express';

import schedulesRouter from './schedules.routes';
import truckProfileRouter from './truckProfile.routes';

const routes = Router();

routes.use('/schedules', schedulesRouter);
routes.use('/food-truck/profile', truckProfileRouter);

export default routes;
