import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import FoodTruck from '../models/FoodTruck';

class FoodTruckController {
  async index(req, res) {
    const foodtrucks = await FoodTruck.findAll({
      // where: { owner: true },
      attributes: ['id', 'name', 'description', 'credit_card', 'picture_id'],
      include: [
        {
          model: File,
          as: 'picture',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(foodtrucks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      own_address: Yup.bool().required(),
      description: Yup.string(),
      credit_card: Yup.bool().required(),
      terms_acceptance: Yup.bool().required(),
      cnpj: Yup.string(),
      phone: Yup.string().required(),
      address: Yup.string().when('own_address', (own_address, field) =>
        own_address === true
          ? field.required().oneOf([Yup.ref('address')])
          : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    /**
     * Check if the user is an owner
     */

    const user_id = req.userId;

    const isOwner = await User.findOne({
      where: { id: user_id, owner: true },
    });

    if (!isOwner) {
      return res.status(401).json({
        error:
          'You need to be a food truck owner in order to create a food-truck profile',
      });
    }

    /**
     * Check if the user accepted terms and conditions
     */
    const { terms_acceptance } = req.body;

    if (terms_acceptance === false) {
      return res.status(401).json({
        error:
          'You need to accept our terms and conditions in order to create a food-truck profile ',
      });
    }

    /**
     * Create a food-truck profile
     */

    const {
      id,
      name,
      own_address,
      address,
      description,
      credit_card,
      cnpj,
      phone,
    } = await FoodTruck.create(req.body);

    return res.json({
      id,
      user_id: req.userId,
      name,
      own_address,
      address,
      description,
      credit_card,
      cnpj,
      phone,
      terms_acceptance,
    });
  }

  async delete(req, res) {
    const foodtruck = await FoodTruck.findByPk(req.params.truckId);

if (!foodtruck) {
      return res.status(404).json({
        error: 'This food-truck was not found.',
      });
    }

    /**
     * Check if the user is allowed to delete a profile.
     */

    if (foodtruck.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this food-truck.",
      });
    }

    await FoodTruck.destroy({
      where: { id: req.params.truckId },
    });

    return res.json();
  }
}

export default new FoodTruckController();
