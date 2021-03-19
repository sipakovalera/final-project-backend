const Sequelize = require("sequelize");
const logger = require('../../utils/logger');

const sequelizeDB = new Sequelize("users", "root", "default", {
  dialect: 'mysql',
  host: "localhost",
  port: 3306,
  define: {
    timestamps: false
  }
});

sequelizeDB
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the DATABASE:', err);
    logger.error('Cannot connet to database')
  });

module.exports = sequelizeDB;
