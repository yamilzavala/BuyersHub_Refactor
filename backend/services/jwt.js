var jwt = require('jwt-simple');
var moment = require('moment');

//clave para hashear objeto user
var secret = 'clave_secreta';

//Codificamos datos de user a token
exports.createToken = function(user) {

    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: user.password,
        role: user.role,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    //retornamos objeto codificado
    return jwt.encode(payload, secret);
}