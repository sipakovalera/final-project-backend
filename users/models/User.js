const { DataTypes } = require('sequelize');
const sequelizeDB = require('./connection');

const User = sequelizeDB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  login: {
    type: DataTypes.STRING,
    allowNull: false  
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false    
  },

  avatar: {
    type: DataTypes.STRING
  }

}, {
    timestamps: false
});


module.exports = User;
