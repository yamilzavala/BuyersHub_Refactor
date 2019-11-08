//Iniciar variables
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/suscripciones_db', (err, res) => {
    if (err) throw err;

    console.log('La DB se contectó');

    // Configuración del servidor    
    app.listen(port, (err, res) => {
        if (err)
            throw err;
        else
            console.log('Api corriendo en el puerto ' + port);
    });
})