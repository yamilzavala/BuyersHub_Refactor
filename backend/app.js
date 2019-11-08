// Requires 
var express = require('express');
var bodyParser = require('body-parser');

// Iniciar de express
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});


// Cargar rutas
var product_routes = require('./routes/product');

// Configurar body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Declaracion rutas
app.use('/api/products', product_routes);




module.exports = app;