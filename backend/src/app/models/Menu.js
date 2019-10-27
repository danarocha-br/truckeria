import Sequelize, { Model } from 'sequelize';

class Menu extends Model {
  static init(sequelize) {
    super.init(
      {
        foodtruck_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        vegan: Sequelize.BOOLEAN,
        vegetarian: Sequelize.BOOLEAN,
        categories: Sequelize.ARRAY(Sequelize.STRING),
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
    this.belongsTo(models.File, { foreignKey: 'picture_id', as: 'picture' });
    this.belongsToMany(models.Schedule, {
      foreignKey: 'menu_id',
      through: 'schedule_menus',
      as: 'schedules',
    });
  }
}

export default Menu;
