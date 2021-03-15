const { request, response } = require('express');

const controller = {
    home : (request, response)=>{
        response.send('Yop!')
    }
}

module.exports = controller;