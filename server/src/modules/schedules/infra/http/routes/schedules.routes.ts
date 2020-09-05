import { Router } from 'express';
import { parseISO } from 'date-fns';

import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';
import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const schedulesRouter = Router();
schedulesRouter.use(ensureAuthentication);

schedulesRouter.get('/', (req, res) => {
  const schedulesRepository = new SchedulesRepository();

  // const schedules = schedulesRepository.all();
  // return res.json(schedules);
});

schedulesRouter.post('/', (req, res) => {
  try {
    const { truck_id, city, state, lat, lon, date_start, date_end } = req.body;

    const schedulesRepository = new SchedulesRepository();

    const parsedDateStart = parseISO(date_start);
    const parsedDateEnd = parseISO(date_end);

    const createSchedule = new CreateScheduleService(schedulesRepository);

    const schedule = createSchedule.execute({
      truck_id,
      city,
      state,
      lat,
      lon,
      date_start: parsedDateStart,
      date_end: parsedDateEnd,
    });

    return res.json(schedule);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default schedulesRouter;
