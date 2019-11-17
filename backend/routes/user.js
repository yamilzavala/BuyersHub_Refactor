var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

api.get('/probando-controllador', md_auth.ensureAuth, UserController.testUser);
api.post('/save-user', UserController.saveUser);
api.post('/login', UserController.userLogin);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.actualizarUser);

module.exports = api;