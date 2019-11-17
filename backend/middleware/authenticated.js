var jwt = require('jwt-simple');
var moment = require('moment');

//clave para hashear objeto user
var secret = 'clave_secreta';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ mesaage: 'La peticion no tiene la cabecera de autenticacion' });
    }

    //tomamos token y le sacamos los espacios
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        //validamos si el token expiro
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ mesaage: 'Token expirado' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ mesaage: 'Token no valido' });
    }


    req.user = payload;
    next();
};