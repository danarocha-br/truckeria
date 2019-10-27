import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';

import FoodTruck from '../models/FoodTruck';
import User from '../models/User';
import Menu from '../models/Menu';
import Schedule from '../models/Schedule';

class ScheduleController {
  async index(req, res) {
    const schedules = await Schedule.findAll({
      where: { foodtruck_id: req.params.truckId },
      include: [
        {
          model: Menu,
          as: 'menus',
          through: {
            attributes: [
              'id',
              'name',
              'description',
              'price',
              'vegan',
              'vegetarian',
              'categories',
            ],
          },
        },
      ],
    });

    return res.json(schedules);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date_from: Yup.date().required(),
      date_until: Yup.date().required(),
      zipcode: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      country: Yup.string().required(),
      menu_items: Yup.array(),
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
     * Check if the foodtruck exists
     */

    const foodtruck = req.params.truckId;

    const isFoodTruck = await FoodTruck.findOne({
      where: { id: foodtruck },
    });

    if (!isFoodTruck) {
      return res.status(401).json({
        error: 'You need to select a food-truck profile to create a schedule.',
      });
    }

    /**
     * Check if the date and hour are valid
     */

    const { date_from, date_until } = req.body;
    const dateInterval = {
      start: parseISO(date_from),
      end: parseISO(date_until),
    };

    if (isBefore(dateInterval.start, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed.' });
    }

    if (isBefore(dateInterval.end, dateInterval.start)) {
      return res
        .status(400)
        .json({ error: 'The end date needs to be later than start date.' });
    }

    /**
     * Check date availability
     */

    const isDateBooked = await Schedule.findOne({
      where: {
        foodtruck_id: foodtruck,
        date_from: dateInterval.start,
        date_until: dateInterval.end,
      },
    });

    if (isDateBooked) {
      return res.status(400).json({
        error:
          'You have already booked this date and time, if can update previous time if you would like.',
      });
    }

    /**
     * Create Schedule
     */

    const {
      id,
      zipcode,
      city,
      state,
      street,
      number,
      country,
      menu_items,
    } = req.body;

    const schedule = await Schedule.create({
      id,
      foodtruck_id: foodtruck,
      date_from,
      date_until,
      zipcode,
      city,
      state,
      street,
      number,
      country,
    });

    if (menu_items && menu_items.length > 0) {
      schedule.setMenus(menu_items);
    }

    return res.json({
      id,
      menu_items,
      foodtruck_id: foodtruck,
      date_from,
      date_until,
      zipcode,
      city,
      state,
      street,
      number,
      country,
    });
  }

  async delete(req, res) {
    /**
     * Check if the user is allowed to delete a profile.
     */

    const foodtruck = req.params.truckId;

    const isAllowed = await Schedule.findOne({
      where: { foodtruck_id: foodtruck, id: req.params.scheduleId },
    });

    if (!isAllowed) {
      return res.status(401).json({
        error: 'This schedule was not found under this profile.',
      });
    }

    await Schedule.destroy({
      where: { id: req.params.scheduleId },
    });

    return res.json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      date_from: Yup.date().required(),
      date_until: Yup.date().required(),
      zipcode: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      country: Yup.string().required(),
      menu_items: Yup.array(),
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
          'You need to be the owner of this profile in order to update it.',
      });
    }

    /**
     * Check if the schedule exists
     */

    const foodtruck = req.params.truckId;

    const isAllowed = await Schedule.findOne({
      where: { foodtruck_id: foodtruck, id: req.params.scheduleId },
    });

    if (!isAllowed) {
      return res.status(401).json({
        error: 'This schedule was not found under this profile.',
      });
    }

    /**
     * Check if the date and hour are valid
     */

    const { date_from, date_until } = req.body;
    const dateInterval = {
      start: parseISO(date_from),
      end: parseISO(date_until),
    };

    if (isBefore(dateInterval.start, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed.' });
    }

    if (isBefore(dateInterval.end, dateInterval.start)) {
      return res
        .status(400)
        .json({ error: 'The end date needs to be later than start date.' });
    }

    /**
     * Check date availability
     */

    const isDateBooked = await Schedule.findOne({
      where: {
        foodtruck_id: foodtruck,
        date_from: dateInterval.start,
        date_until: dateInterval.end,
      },
    });

    if (isDateBooked) {
      return res.status(400).json({
        error: 'You have already booked this date and time.',
      });
    }

    /**
     * Update
     */

    const {
      id,
      zipcode,
      city,
      state,
      street,
      number,
      country,
      menu_items,
    } = req.body;

    const schedule = await Schedule.update({
      id,
      foodtruck_id: foodtruck,
      date_from,
      date_until,
      zipcode,
      city,
      state,
      street,
      number,
      country,
    });

    if (menu_items && menu_items.length > 0) {
      schedule.setMenus(menu_items);
    }

    return res.json({
      id,
      menu_items,
      foodtruck_id: foodtruck,
      date_from,
      date_until,
      zipcode,
      city,
      state,
      street,
      number,
      country,
    });
  }
}

export default new ScheduleController();
