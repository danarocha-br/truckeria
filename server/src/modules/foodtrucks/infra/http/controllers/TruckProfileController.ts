import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTruckProfileService from '@modules/foodtrucks/services/CreateTruckProfileService';
import ListOneTruckProfileService from '@modules/foodtrucks/services/ListOneTruckProfileService';
import UpdateTruckProfileService from '@modules/foodtrucks/services/UpdateTruckProfileService';
import DeleteOneTruckProfileService from '@modules/foodtrucks/services/DeleteOneTruckProfileService';

class TrucksProfilesController {
  /**
   * index to one truck profile
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const truck_id = req.body.id;

    const listOneTruckProfile = container.resolve(ListOneTruckProfileService);

    const trucksProfiles = await listOneTruckProfile.execute({
      truck_id,
    });

    return res.json(trucksProfiles);
  }

  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    } = req.body;

    const user_id = req.user.id;

    const createTruckProfile = container.resolve(CreateTruckProfileService);

    const truckProfile = await createTruckProfile.execute({
      user_id,
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      photo_filename: req.file.filename,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    });

    return res.json(truckProfile);
  }

  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const {
      truck_id,
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      photo_filename,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    } = req.body;

    const user_id = req.user.id;

    const updateTruckProfile = container.resolve(UpdateTruckProfileService);

    const truckProfile = await updateTruckProfile.execute({
      user_id,
      truck_id,
      name,
      description,
      cuisines,
      payment_methods,
      catering,
      photo_filename,
      email,
      phone,
      city,
      state,
      web,
      instagram,
      facebook,
      twitter,
    });

    return res.json(truckProfile);
  }

  /**
   * delete
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const truck_id = req.body.id;
    const user_id = req.user.id;

    const deleteOneTruckProfileService = container.resolve(
      DeleteOneTruckProfileService,
    );

    const deletedProfile = await deleteOneTruckProfileService.execute({
      truck_id,
      user_id,
    });

    return res.json(deletedProfile);
  }
}

export default TrucksProfilesController;
