const sequelize = require("../database");
const { DataTypes, Model } = require("sequelize");

class Town extends Model {}
Town.init(
  {
    name_town: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "towns",
  }
);

module.exports = Town;
