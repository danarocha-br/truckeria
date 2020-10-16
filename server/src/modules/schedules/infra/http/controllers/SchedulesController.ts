import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import UpdateScheduleService from '@modules/schedules/services/UpdateScheduleService';
import DeleteScheduleService from '@modules/schedules/services/DeleteScheduleService';
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
    const { truck_id, address, city, state, lat, lon, date_start, date_end } = req.body;

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute({
      user_id: req.user.id,
      truck_id,
      address,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    return res.json(schedule);
  }

  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const { schedule_id, address, city, state, lat, lon, date_start, date_end } = req.body;

    const user_id = req.user.id;

    const updateSchedule = container.resolve(UpdateScheduleService);

    const schedule = await updateSchedule.execute({
      user_id,
      schedule_id,
      address,
      city,
      state,
      lat,
      lon,
      date_start,
      date_end,
    });

    return res.json(schedule);
  }

  /**
   * delete
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const { schedule_id }= req.body;
    const user_id = req.user.id;

    const deleteOneScheduleService = container.resolve(
      DeleteScheduleService,
    );

    const deletedSchedule = await deleteOneScheduleService.execute({
      schedule_id,
      user_id,
    });

    return res.json(deletedSchedule);
  }
}

export default SchedulesController;
