'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  donations.init({
    donatorName: DataTypes.STRING,
    compaignName: DataTypes.STRING,
    cryptoCurrencyWallet: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'donations',
  });
  return donations;
};