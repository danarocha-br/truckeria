import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        foodtruck_id: Sequelize.INTEGER,
        menu_items: Sequelize.VIRTUAL,
        date_from: Sequelize.DATE,
        date_until: Sequelize.DATE,
        zipcode: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.FoodTruck, {
      foreignKey: 'foodtruck_id',
      as: 'foodtruck',
    });
    this.belongsToMany(models.Menu, {
      foreignKey: 'schedule_id',
      through: 'schedule_menus',
      as: 'menus',
    });
  }
}

export default Schedule;
