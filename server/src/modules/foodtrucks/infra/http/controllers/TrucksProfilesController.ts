import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
}

export default TrucksProfilesController;
