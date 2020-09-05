import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import schedulesRouter from './schedules.routes';
import truckProfileRouter from './truckProfile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/schedules', schedulesRouter);
routes.use('/food-truck/profile', truckProfileRouter);

export default routes;
