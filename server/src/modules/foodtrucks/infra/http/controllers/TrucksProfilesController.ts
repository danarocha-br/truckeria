import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTruckProfileService from '@modules/foodtrucks/services/CreateTruckProfileService';
import ListTrucksProfilesService from '@modules/foodtrucks/services/ListTrucksProfilesService';

class TrucksProfilesController {
  /**
   * index to list all the profiles linked to an user
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listTrucksProfiles = container.resolve(ListTrucksProfilesService);

    const trucksProfiles = await listTrucksProfiles.execute({
      user_id,
    });

    return res.json(trucksProfiles);
  }

  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      user_id,
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

    const createTruckProfile = container.resolve(CreateTruckProfileService);

    const truckProfile = await createTruckProfile.execute({
      user_id,
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
}

export default TrucksProfilesController;
