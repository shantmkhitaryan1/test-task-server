'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compaigns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      compaigns.hasMany(models.donations, {
        foreignKey: "compaign_id",
        as: 'compaign'
      })
    }
  }
  compaigns.init({
    name: {
      type: DataTypes.TEXT,
        unique: {
        args: true,
        msg: 'Name already in use!'
      }
    },
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    goalAmount: DataTypes.INTEGER,
    expiresIn: DataTypes.DATE,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'compaigns',
  });
  return compaigns;
};