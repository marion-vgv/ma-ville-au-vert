const sequelize = require("../database");
const { DataTypes, Model } = require("sequelize");

class Education_place extends Model {}
Education_place.init(
  {
    id_uai: DataTypes.STRING,
    name_place: DataTypes.STRING,
    secteur: DataTypes.STRING,
    code_academy: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "education_places",
  }
);

module.exports = Education_place;
