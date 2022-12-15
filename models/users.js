'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.compaigns, {
        foreignKey: "user_id",
        as: 'users'
      })
    }
  }
  users.init({
    userName: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already in use!'
      }
    },
    password: DataTypes.STRING,
    cryptoWalletAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};