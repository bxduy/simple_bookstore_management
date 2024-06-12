import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.config.js';
import userModel from './user.model.js';
import bookModel from './book.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: userModel(sequelize, DataTypes),
    book: bookModel(sequelize, DataTypes)
};

export default db;