import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import ListMonthScheduleService from '@modules/schedules/services/ListMonthScheduleService';

class SchedulesController {
  /**
   * list schedules for a food truck within a given month
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { truck_id, month, year } = req.body;

    const listSchedules = container.resolve(ListMonthScheduleService);

    const schedules = await listSchedules.execute({
      truck_id,
      month,
      year,
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
