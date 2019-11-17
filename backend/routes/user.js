var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/probando-controllador', UserController.testUser);
api.post('/save-user', UserController.saveUser);

module.exports = api;