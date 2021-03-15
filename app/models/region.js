const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Region extends Model {}
    Region.init({
        name_region: DataTypes.STRING,    
}, {
    sequelize,
    tableName: 'regions'
});

module.exports = Region;