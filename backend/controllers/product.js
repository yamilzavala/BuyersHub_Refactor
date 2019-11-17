// Importaciones
const Producto = require('../models/product');
const emailManager = require('../handlers/email');
//var mongoosePaginate = require('mongoose-paginate');

//Logica de negocio
function test(req, res) {
    res.status(200).send({
        ok: true,
        message: "Controller de prueba OK"
    });
}


function getProductos(req, res) {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({}, (err, productos) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: "Error cargando productos",
                    errors: err
                });
            }

            Producto.count({}, (err, conteo) => {
                res.status(200).send({
                    ok: true,
                    productos,
                    total: conteo
                });
            });

        })
        .skip(desde)
        .limit(3);
}


// function getProductPerPage(req, res) {
//     var page = req.params.page; // ? page : 1;
//     var itemsPerPage = 3;

//     Producto.paginate(page, itemsPerPage, function(err, productos, total) {
//         if (err) {
//             res.status(500).send({ message: 'Error al obtener productos paginados', err });
//         } else {
//             if (!productos) {
//                 res.status(404).send({ message: 'No se encontraron productos' });
//             } else {
//                 return res.status(200).send({
//                     total_items: total,
//                     productos: productos
//                 });
//             }
//         }
//     });
// }


function getProductoById(req, res) {
    var productId = req.params.id;

    Producto.findById(productId, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar producto', err });
        } else {
            if (!product) {
                res.status(404).send({ message: 'No se encontro el producto buscado' });
            } else {
                res.status(200).send(product);
            }
        }

    });
}

// function getProductosPorColeccion(req, res) {
//     var termino = req.params.busqueda;
//     var tabla = req.params.tabla;
//     var regex = new RegExp(termino, 'i');

//     var promesa;

//     switch (tabla) {
//         case 'productos':
//             promesa = buscarProductos(termino, regex);
//             break;
//         default:
//             return res.status(404).send({
//                 ok: false,
//                 message: 'Tipo de tabla especificado no valido'
//             });
//     }

//     promesa.then(data => {
//         res.status(200).send({
//             ok: true,
//             [tabla]: data
//         });
//     });

// }

function getProductosPorTermino(req, res) {
    var termino = req.params.termino;

    console.log(termino);
    console.log(req.params);

    //Producto.find({ nombre: termino }, (err, productosFiltrados) => {
    Producto.find((err, productosFiltrados) => {

        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Error al buscar termino'
            });
        } else {
            if (!productosFiltrados) {
                res.status(404).send({
                    ok: false,
                    message: 'No se encuentran registros cpara termino especificado'
                });
            } else {

                Producto.count({}, (err, conteo) => {
                    res.status(200).send({
                        ok: true,
                        productosFiltrados,
                        total: conteo
                    });
                });


            }
        }
    }).where({ $or: [{ "nombre": { '$regex': termino, '$options': 'i' } }, { "categoria": { '$regex': termino, '$options': 'i' } }, { "descripcion": { '$regex': termino, '$options': 'i' } }] });
}



function saveProduct(req, res) {
    var producto = new Producto();

    // Obtener data del body
    var params = req.body;

    //Mapear producto
    productMapper(producto, params);

    producto.save((err, productoGuardado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar producto', err });
        } else {
            if (!productoGuardado) {
                res.status(400).send({ message: 'El producto no ha sido guardado' });
            } else {
                res.status(200).send({
                    message: 'Producto guardado correctamente',
                    productoGuardado
                });
            }
        }
    });
}



function updateProducto(req, res) {
    var productId = req.params.id;
    var update = req.body;

    console.log(this.update);

    Producto.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar producto', err });
        } else {
            if (!productUpdated) {
                res.status(404).send({ message: 'No se encontro el producto a actualizar' });
            } else {
                emailManager.enviar();
                res.status(200).send({
                    message: 'Producto actualizado correctamente',
                    productUpdated
                });
            }
        }

    });



}



function eliminarProducto(req, res) {
    var productId = req.params.id;


    Producto.findByIdAndDelete(productId, (err, productDeleted) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar producto', err });
        } else {
            if (!productDeleted) {
                res.status(404).send({ message: 'No se encontro el producto a eliminar' });
            } else {
                emailManager.enviar();
                res.status(200).send(productDeleted);
            }
        }

    });
}



//Mapeador
function productMapper(product, params) {
    product.nombre = params.nombre ? params.nombre : 'Sin nombre asignado';
    product.categoria = params.categoria ? params.categoria : 'Sin categoria asignada';
    product.descripcion = params.descripcion ? params.descripcion : 'Sin descripcion asignada';
    product.imagen = params.imagen ? params.imagen : '';
    product.estaSuscripto = params.estaSuscripto ? params.estaSuscripto : 'false';
    product.cantidadSuscripciones = params.cantidadSuscripciones ? params.cantidadSuscripciones : 0;
}






module.exports = {
    test,
    getProductos,
    saveProduct,
    getProductoById,
    updateProducto,
    eliminarProducto,
    getProductosPorTermino
    //getProductPerPage
}