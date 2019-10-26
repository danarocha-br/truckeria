import Sequelize, { Model } from 'sequelize';

class FoodTruck extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        own_address: Sequelize.BOOLEAN,
        address: Sequelize.STRING,
        description: Sequelize.STRING,
        credit_card: Sequelize.BOOLEAN,
        terms_acceptance: Sequelize.BOOLEAN,
        cnpj: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'foodtrucks',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'picture_id', as: 'picture' });
  }
}

export default FoodTruck;
