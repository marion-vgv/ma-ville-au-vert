const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Urban_unit extends Model {}
    Urban_unit.init({
        name_uu: DataTypes.STRING,    
        tranche_uu: DataTypes.INTEGER,
        tranche_detailled: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'urban_units'
});

module.exports = Urban_unit;