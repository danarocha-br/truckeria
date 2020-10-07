import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import ListSchedulesService from '@modules/schedules/services/ListSchedulesService';

class SchedulesController {
  /**
   * list all schedules for a food truck
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { truck_id } = req.params;

    const listSchedules = container.resolve(ListSchedulesService);

    const schedules = await listSchedules.execute({
      truck_id,
    });

    return res.json(schedules);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { truck_id, city, state, lat, lon, date_start, date_end } = req.body;

    const parsedDateStart = parseISO(date_start);
    const parsedDateEnd = parseISO(date_end);

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute({
      user_id: req.user.id,
      truck_id,
      city,
      state,
      lat,
      lon,
      date_start: parsedDateStart,
      date_end: parsedDateEnd,
    });

    return res.json(schedule);
  }
}

export default SchedulesController;
