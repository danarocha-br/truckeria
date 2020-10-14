import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SchedulesController from '@modules/schedules/infra/http/controllers/SchedulesController';
import MonthlyScheduleController from '@modules/schedules/infra/http/controllers/MonthlyScheduleController';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const schedulesRouter = Router();
const schedulesController = new SchedulesController();
const monthlyScheduleController = new MonthlyScheduleController();

schedulesRouter.use(ensureAuthentication);
schedulesRouter.use(ensureAuthentication);

schedulesRouter.get(
  '/:truck_id/all',
  celebrate({
    [Segments.PARAMS]: {
      truck_id: Joi.string().uuid().required(),
    },
  }),
  schedulesController.index,
);
schedulesRouter.get(
  '/:truck_id/month',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      truck_id: Joi.string().uuid().required(),
    },
  }),
  monthlyScheduleController.index,
);

schedulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      truck_id: Joi.string().uuid().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      lat: Joi.string().required(),
      lon: Joi.string().required(),
      date_start: Joi.date().required(),
      date_end: Joi.date().required(),
    },
  }),
  schedulesController.create,
);

schedulesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      schedule_id: Joi.string().uuid().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      lat: Joi.string().required(),
      lon: Joi.string().required(),
      date_start: Joi.date().required(),
      date_end: Joi.date().required(),
    },
  }),
  schedulesController.update,
);


export default schedulesRouter;
