const { DataTypes } = require('sequelize');
const sequelizeDB = require('./connection');

const Friends = sequelizeDB.define(
  'Friends',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  },
  { 
    freezeTableName: true 
  }, {
    timestamps: false
  }
);

Friends.associate = models => {
  Friends.belongsTo(models.User, {
      as: 'friends',
      foreignKey: 'userId'
  });
};

module.exports = Friends;
