var express = require('express');

// Defino el controller a utilizar
var productController = require('../controllers/product');

//Declaro el ruteo de express
var api = express.Router();

//rutas y endpoints
api.get('/test', productController.test);
api.get('/getProductos/:desde?', productController.getProductos);
//api.get('/getProductosPorPagina/:page?', productController.getProductPerPage);
api.get('/getProductById/:id', productController.getProductoById);
api.get('/getProductoByTermino/:termino?', productController.getProductosPorTermino)
api.post('/saveProduct', productController.saveProduct);
api.put('/updateProduct/:id', productController.updateProducto);
api.delete('/deleteProduct/:id', productController.eliminarProducto);




module.exports = api;