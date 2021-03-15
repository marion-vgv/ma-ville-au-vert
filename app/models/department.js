const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Department extends Model {}
    Department.init({
        name_dpt: DataTypes.STRING,    
}, {
    sequelize,
    tableName: 'departments'
});

module.exports = Department;