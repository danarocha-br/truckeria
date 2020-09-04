import { Router } from 'express';
import { parseISO } from 'date-fns';

import SchedulesRepository from '../repositories/SchedulesRepository';
import CreateScheduleService from '../services/CreateScheduleService';

const schedulesRouter = Router();
const schedulesRepository = new SchedulesRepository();

schedulesRouter.get('/', (req, res) => {
  const schedules = schedulesRepository.all();

  return res.json(schedules);
});

schedulesRouter.post('/', (req, res) => {
  try {
    const { truckId, city, state, lat, lon, date_start, date_end } = req.body;

    const parsedDateStart = parseISO(date_start);
    const parsedDateEnd = parseISO(date_end);

    const createSchedule = new CreateScheduleService(schedulesRepository);

    const schedule = createSchedule.execute({
      truckId,
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
