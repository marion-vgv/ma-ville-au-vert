require('dotenv').config();

const express = require('express');
const multer = require('multer');
const bodyParser = multer();

const router = require ('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.none());
app.use(router);
app.listen(port, ()=> {
    console.log(`Launched, visit http://localhost:${port}`);
})