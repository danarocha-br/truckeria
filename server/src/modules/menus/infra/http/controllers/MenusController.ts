
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMenuService from '@modules/menus/services/CreateMenuService';
import ListAllMenusService from '@modules/menus/services/ListAllMenusService';
import UpdateMenuService from '@modules/menus/services/UpdateMenuService';
import DeleteMenuService from '@modules/menus/services/DeleteMenuService';

class MenusController {
  /**
   * index to list all the menus linked to a food truck
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { truck_id } = req.params;

    const listAllMenusService = container.resolve(ListAllMenusService);

    const menus = await listAllMenusService.execute({
      truck_id,
    });

    return res.json(classToClass(menus));
  }

  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      truck_id,
      title,
      description,
      type,
      options,
      price,
    } = req.body;

    const user_id = req.user.id;
    console.log(req.file);


    const createMenuItem = container.resolve(CreateMenuService);

    const menuItem = await createMenuItem.execute({
      user_id,
      truck_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename: req.file.path,
    });


    return res.json(menuItem);
  }

  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const {
      truck_id,
      menu_id,
      title,
      description,
      type,
      options,
      price,
    } = req.body;

    const user_id = req.user.id;

    const updateMenuService = container.resolve(UpdateMenuService);

    const menu = await updateMenuService.execute({
      truck_id,
      user_id,
      menu_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename: req.file.filename,
    });

    return res.json(menu);
  }

  /**
   * delete
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const { menu_id } = req.params;
    const user_id = req.user.id;

    const deleteOneMenuItem = container.resolve(
      DeleteMenuService,
    );

    const deletedMenu = await deleteOneMenuItem.execute({
      menu_id,
      user_id,
    });

    return res.json(deletedMenu);
  }

}

export default MenusController;
