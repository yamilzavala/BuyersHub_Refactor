var bcrypt = require('bcrypt');
var User = require('../models/user');


function testUser(req, res) {
    res.status(200).send({
        ok: true,
        message: 'Test controller user'
    });
}

function saveUser(req, res) {
    var user = new User();

    // Obtener data del body
    var params = req.body;

    console.log(params);

    userMapper(user, params);

    console.log(user.password);

    if (user.email != null && user.password != null) {
        user.save((err, useroGuardado) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar User', err });
            } else {
                if (!useroGuardado) {
                    res.status(400).send({ message: 'El User no ha sido guardado' });
                } else {
                    res.status(200).send({
                        message: 'User guardado correctamente',
                        useroGuardado
                    });
                }
            }
        });

    } else {
        res.status(200).send({ message: 'Debe ingresar email y password' });
    }
}


//Mapeador
function userMapper(user, params) {
    user.nombre = params.nombre ? params.nombre : 'Sin nombre asignado';
    user.apellido = params.apellido ? params.apellido : 'Sin apellido asignado';
    user.email = params.email ? params.email : 'Sin email asignado';
    user.password = bcrypt.hashSync(params.password, 10);
    user.role = params.rol ? params.rol : 'User_Role';
    user.imagen = params.imagen ? params.imagen : 'Sin imagen';
}



module.exports = {
    testUser,
    saveUser
}