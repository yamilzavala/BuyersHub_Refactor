var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsByUserSchema = Schema({
    idUser: { type: Schema.ObjectId, ref: 'User' },
    idProducto: { typpe: Schema.ObjectId, ref: 'Producto' }
});

module.exports = mongoose.model('ProductsByUser', ProductsByUserSchema);