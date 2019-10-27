import * as Yup from 'yup';

import FoodTruck from '../models/FoodTruck';
import User from '../models/User';
import File from '../models/File';
import Menu from '../models/Menu';

class MenuController {
  async index(req, res) {
    const menus = await Menu.findAll({
      where: {
        foodtruck_id: req.params.truckId,
      },
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'vegan',
        'vegetarian',
        'categories',
        'picture_id',
      ],
      include: [
        {
          model: File,
          as: 'picture',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: FoodTruck,
          as: 'foodtruck',
          attributes: ['id', 'name', 'address', 'credit_card', 'picture_id'],
        },
      ],
    });

    return res.json(menus);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      price: Yup.number()
        .positive()
        .required(),
      vegan: Yup.bool(),
      vegetarian: Yup.bool(),
      categories: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    /**
     * Check if the foodtruck exists
     */

    const foodtruck = req.params.truckId;

    const isFoodTruck = await FoodTruck.findOne({
      where: { id: foodtruck },
    });

    if (!isFoodTruck) {
      return res.status(401).json({
        error: 'You need to select a food-truck profile to create a menu item.',
      });
    }

    /**
     * Check if the foodtruck belongs to it's owner in order to add a menu item
     */

    // const user = await User.findByPk(req.userId);
    // const foodtruckUser = await FoodTruck.findOne({ where: { user_id: user } });

    // if (!foodtruckUser) {
    //   return res
    //     .status(400)
    //     .json({ error: 'This foodtruck does not belong to you.' });
    // }

    /**
     * Create a menu item
     */

    const {
      id,
      name,
      description,
      price,
      vegan,
      vegetarian,
      categories,
      picture_id,
    } = req.body;

    await Menu.create({
      id,
      foodtruck_id: req.params.truckId,
      name,
      description,
      price,
      vegan,
      vegetarian,
      categories,
      picture_id,
    });

    return res.json({
      id,
      foodtruck_id: req.params.truckId,
      name,
      description,
      price,
      vegan,
      vegetarian,
      categories,
      picture_id,
    });
  }

  async delete(req, res) {
    const menu = await Menu.findByPk(req.params.menuId);

    if (!menu) {
      return res.status(404).json({
        error: 'This menu was not found.',
      });
    }

    /**
     * Check if the user is allowed to delete a profile.
     */

    if (menu.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this menu item.",
      });
    }

    await Menu.destroy({
      where: { id: req.params.menuId },
    });

    return res.json();
  }
}

export default new MenuController();
