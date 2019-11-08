var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    nombre: String,
    categoria: String,
    descripcion: String,
    imagen: String,
    estaSuscripto: Boolean,
    cantidadSuscripciones: Number
});



module.exports = mongoose.model('Producto', productSchema);