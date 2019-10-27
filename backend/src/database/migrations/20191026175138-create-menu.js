module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      foodtruck_id: {
        type: Sequelize.INTEGER,
        references: { model: 'foodtrucks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      picture_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      vegan: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      vegetarian: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('menus');
  },
};
