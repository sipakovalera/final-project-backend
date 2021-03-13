const { DataTypes } = require('sequelize');
const sequelizeDB = require('./connection');

const Friend = sequelizeDB.define(
  'Friend',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  },
);

Friend.associate = models => {
  Friend.belongsTo(models.User, {
      as: 'friend',
      foreignKey: 'userId'
  });
};

module.exports = Friend;
