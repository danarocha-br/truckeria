import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthScheduleService from '@modules/schedules/services/ListMonthScheduleService';

class MonthlyScheduleController {
  /**
   * list schedules for a food truck within a given month
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.query;
    const { truck_id } = req.params;

    const listSchedules = container.resolve(ListMonthScheduleService);

    const schedules = await listSchedules.execute({
      truck_id,
      month: Number(month),
      year: Number(year),
    });

    return res.json(schedules);
  }
}

export default MonthlyScheduleController;
