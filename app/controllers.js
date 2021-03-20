const { request, response } = require('express');
const { Town } = require('./models');

const controller = {
    home : (request, response)=>{
        response.send('Yop!')
    },

    getAllTowns : async (request, response)=>{

        try {
            const towns = await Town.findAll({
                include : 'urban_unit'
            });

            response.json(towns);
        }  catch (error){
            console.log(error)
            response.status(500).send('Une erreur est surevnue');
        }




    }
}

module.exports = controller;