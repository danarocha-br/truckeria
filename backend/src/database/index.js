import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import FoodTruck from '../app/models/FoodTruck';
import Menu from '../app/models/Menu';
import Schedule from '../app/models/Schedule';

import dbConfig from '../config/database';

const models = [User, File, FoodTruck, Menu, Schedule];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
