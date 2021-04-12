const { request, response } = require('express');
const { Town, Urban_unit, Department, Population, Education_type, Education_place, Region } = require('../models');
const { Op } = require("sequelize");

const searchController = {
    home : async (request, response)=>{
        // Donnees a recuperer pour generer le formulaire et les valeurs associees : 
        // - Regions (noms + ID)
        // - Departement (nom + ID)

        try{
            const regions = await Region.findAll();
            const departments = await Department.findAll();
            const data = {regions,departments}

            response.json(data);

        }
        catch (error){
            console.log(error)
            response.status(500).send('Une erreur est survenue');
        }
    },




    getSearch : async (request, response)=>{
        /* DONNES RECUPEREES DU FORM */

        console.log(request.body);

        // ETENDUE GEOGRAPHIQUE DE LA RECHERCHE
        let france = false;
        let region = 0;
        let department = 0;

        // Selon la sélection de l'user, on change la valeur de la variable concernée
        switch (request.body.location) {
            case 'france':
                france=true;
                break;

            case 'region':
                region=parseInt(request.body.locationRegion);
                break; 

            case 'department':
                department=parseInt(request.body.locationDepartment);
                break;  
        };

        // TYPE DE VILLE RECHERCHEE
        const townType = request.body.type;
        const uuType = parseInt(request.body.uu);

        // TAILLE DE VILLE RECHERCHEE
        const minPeopleTown = parseInt(request.body.townMin);      
        const maxPeopleTown = parseInt(request.body.townMax);

        // CRITERES DE RECHERCHE LIES A L'EDUCATION
        let schoolNeeded;


            if (request.body.school=='true') {
                schoolNeeded=true;
            } else {
                schoolNeeded=false;
            };

        let schoolType = [];
        let schoolOptions = request.body.schoolOptions;
        
        if (schoolOptions !== undefined){
        if (schoolOptions.includes('mater')==true){
            schoolType.push(101,102,103,111)
        };

        if (schoolOptions.includes('prim')==true){
            schoolType.push(151,152,153,160, 161, 162, 169, 170)
        };

        if (schoolOptions.includes('coll')==true){
            schoolType.push(340, 350, 352)
        };

        if (schoolOptions.includes('lycee')==true){
            schoolType.push(300, 301, 302, 306, 310, 312, 315,320,334,335,336,349)
        };

        if (schoolOptions.includes('segpa')){
            schoolType.push(390)
        };}

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
                    where: {tranche_uu : uuType}, 
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