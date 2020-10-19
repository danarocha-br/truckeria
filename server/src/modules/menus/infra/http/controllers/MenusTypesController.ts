
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllMenusByTypeService from '@modules/menus/services/ListAllMenusByTypeService';

class MenusTypesController {
  /**
   * index to list all the menus by type linked to a food truck
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { truck_id } = req.params;
    const { type } = req.query;

    const listAllMenusByTypeService = container.resolve(ListAllMenusByTypeService);

    const menus = await listAllMenusByTypeService.execute({
      truck_id,
      type: String(type)
    });

    return res.json(menus);
  }
}

export default MenusTypesController;
