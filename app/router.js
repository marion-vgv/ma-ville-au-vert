const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get ('/', controllers.home );
router.get('/towns', controllers.getAllTowns);

module.exports = router;