import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordReset from '@modules/users/infra/http/routes/passwordReset.routes';
import userProfile from '@modules/users/infra/http/routes/userProfile.routes';
// import schedulesRouter from '@modules/schedules/infra/http/routes/schedules.routes';
import truckProfileRouter from './truckProfile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordReset);
routes.use('/profile', userProfile);

// routes.use('/schedules', schedulesRouter);
routes.use('/foodtruck/profile', truckProfileRouter);

export default routes;
