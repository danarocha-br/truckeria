import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordResetRouter from '@modules/users/infra/http/routes/passwordReset.routes';
import userProfileRouter from '@modules/users/infra/http/routes/userProfile.routes';
import foodTrucksProfileRouter from '@modules/foodtrucks/infra/http/routes/foodTrucksProfile.routes';
import schedulesRouter from '@modules/schedules/infra/http/routes/schedules.routes';
import menusRouter from '@modules/menus/infra/http/routes/menus.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordResetRouter);
routes.use('/profile', userProfileRouter);

routes.use('/schedules', schedulesRouter);
routes.use('/foodtruck/profile', foodTrucksProfileRouter);
routes.use('/menus', menusRouter);

export default routes;
