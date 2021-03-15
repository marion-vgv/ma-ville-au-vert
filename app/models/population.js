const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Population extends Model {}
    Population.init({
        population_total: DataTypes.STRING,    
}, {
    sequelize,
    tableName: 'populations'
});

module.exports = Population;