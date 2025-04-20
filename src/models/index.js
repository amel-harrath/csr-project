import Sequelize from 'sequelize';
import config from 'src/config/config.js';

import Company from './company';
import User from './user';
import DocumentType from './document-type';
import Document from './document';
import Requirement from './requirement';

const db = {};
const models = {
  Company,
  User,
  DocumentType,
  Document,
  Requirement,
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

Object.keys(models).forEach((name) => {
  const model = models[name].init(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
