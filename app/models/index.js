const Department = require('./department');
const Education_place = require('./education_place');
const Education_type = require('./education_type');
const Population = require('./population');
const Region = require('./region');
const Town = require('./town');
const Urban_unit = require('./urban_unit');

Region.hasMany(Department,{
    foreignKey: 'id_region',
    as: 'departments'
});

Department.belongsTo(Region, {
    foreignKey: 'id_region',
    as: 'region'
});

Education_type.hasMany(Education_place, {
    foreignKey: 'id_type',
    as: 'level'
});

Education_place.belongsTo(Education_type, {
    foreignKey: 'id',
    as: 'places'
});

Urban_unit.hasMany(Town, {
    foreignKey: 'id_uu',
    as: 'towns'
});

Town.belongsTo(Urban_unit, {
    foreignKey: 'id_uu',
    as: 'urban_unit'
});

Department.hasMany(Town, {
    foreignKey: 'id_dpt',
    as:'towns'
});

Town.belongsTo(Department,{
    foreignKey: 'id_dpt',
    as: 'department'
});

Region.hasMany(Town, {
    foreignKey: 'id_region',
    as: 'towns'
});

Town.belongsTo(Region, {
    foreignKey: 'id_region',
    as: 'region'
});

Town.hasOne(Population,{
    foreignKey:'id_town',
    as: 'population'
});

Population.belongsTo(Town, {
    foreignKey: 'id_town',
    as: 'town'
});

Education_place.belongsTo(Town, {
    foreignKey: 'id_town',
    as: 'town'
});

Town.hasMany(Education_place,{
    foreignKey: 'id_town',
    as: 'school'
});

module.exports = {
    Department,
    Education_place,
    Education_type,
    Population,
    Region,
    Town,
    Urban_unit
};