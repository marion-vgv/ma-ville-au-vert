const sequelize = require("../database");
const { DataTypes, Model } = require("sequelize");

class Education_type extends Model {}
Education_type.init(
  {
    type: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "education_type",
  }
);

module.exports = Education_type;
