const { request, response } = require('express');
const { Town, Urban_unit, Department, Population, Education_type, Education_place } = require('../models');
const { Op } = require("sequelize");

const searchController = {
    home : (request, response)=>{
        response.render('home');
    },

    getAllTowns : async (request, response)=>{

        try {
            const towns = await Town.findAll({
                include : 'urban_unit'
            });

            response.json(towns);
        }  catch (error){
            console.log(error)
            response.status(500).send('Une erreur est survenue');
        }

    },

    getSearch : async (request, response)=>{

        /* DONNES RECUPEREES DU FORM */
        // ETENDUE GEOGRAPHIQUE DE LA RECHERCHE
        const france = false;
        const region = 0;
        const department = 36;

        // TYPE DE VILLE RECHERCHEE
        const townType = 'urbaine';
        const minPeopleUU = 2;
        const maxPeopleUU = 4;

        // TAILLE DE VILLE RECHERCHEE
        const minPeopleTown = 100;      
        const maxPeopleTown = 5000;

        // CRITERES DE RECHERCHE LIES A L'EDUCATION
        const schoolNeeded = true;
        const schoolType = [151];


        try{

            /*
            GESTION DE L'ETENDUE GEOGRAPHIQUE DE LA RECHERCHE
            */
            let location;
            // Si recherche sur toute la France, retourner un array avec tous les departements de France
            if (france==true){
                location = await Department.findAll({
                    where : {
                        id : {[Op.lt]: 250}
                    }
                })
            };

            // Si recherche dans une region, retourner un array avec tous les departements de la region
            if (region !== 0){
                location = await Department.findAll({
                    where : {
                        id_region : region
                    }
                })
            };
            // Si recherche dans un departement, retourner un array contenant ce departement
            if (department !== 0) {

                location = await Department.findAll({
                    where: {
                        id : department
                    }
                });  
            };

            // Transformation de 'location' en un array simple contenant uniquement les numeros de departements
            const locations = location.values();
            let allLocations = [];

            for (const loc of locations){
                allLocations.push(loc.id);
            };
            console.log(allLocations);


            /*
            GESTION DU TYPE DE VILLE
            */

            // Transformation des departements en codes d'uu. 
            // Un code uu sur le modele XX000 correspond a une ville hors uu, c'est a dire, une ville rurale
            const uuLocations = allLocations.map( x => x*1000);
            let uuInclude;
            let uuWhere;

            if (townType == 'urbaine'){
                uuInclude ={[Op.not]:uuLocations};
                uuWhere = {
                    model: Urban_unit,
                    as : 'urban_unit',
                    where: {tranche_uu : {[Op.and]: {
                        [Op.lte]:maxPeopleUU,
                        [Op.gte]:minPeopleUU
                    }}}, 
                }

            } else {
                uuInclude =uuLocations;
                uuWhere = {
                    model: Urban_unit,
                    as : 'urban_unit',
                }
            };


            /*
            GESTION DU CRITERE ECOLES
            */
            let searchCriterias;

            // Si le critere ecole n'est pas necessaire, on retourne un objet sans la limitation where ecole
            if (schoolNeeded === false){
                searchCriterias = {
                    where : {
                        id_uu: uuInclude,
                        id_dpt : allLocations,
    
                    },
                    include : [
                        {
                            model: Department,
                            as : 'department',
                        },
                        {
                            model: Population,
                            as : 'population',
                            where: {population_total: {[Op.and]: {
                                [Op.lte]:maxPeopleTown,
                                [Op.gte]:minPeopleTown
                            }}}
                        },
                        uuWhere,
                        ]
                }

            // Si le critere ecole est necessaire, on retourne un objet avec la limitation where ecole
                } else {
                searchCriterias = {
                    where : {
                        id_uu: uuInclude,
                        id_dpt : allLocations,
    
                    },
                    include : [
                        {
                            model: Department,
                            as : 'department',
                        },
                        {
                            model: Population,
                            as : 'population',
                            where: {population_total: {[Op.and]: {
                                [Op.lte]:maxPeopleTown,
                                [Op.gte]:minPeopleTown
                            }}}
                        },
                        {
                            model: Education_place,
                            as: 'school',
                            where: {id_type: schoolType}
                        },
                        uuWhere,
                        ]
                }
            };

            const searchResult = await Town.findAll(searchCriterias);
            
            response.json(searchResult);
        }

        catch (error){
            console.log(error)
            response.status(500).send('Une erreur est survenue');
        }
    },
}

module.exports = searchController;