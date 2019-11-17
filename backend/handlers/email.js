'use strict';
const nodemailer = require('nodemailer');
const util = require('util');
let testAccount = require('../config/email');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: testAccount.host,
    port: testAccount.port,
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
    }
});

// send mail with defined transport object
exports.enviar = async() => {
    let info = {
        from: '"BuyersHub " <no.replay buyershub@example.com>', // sender address
        to: 'user1@example.com, juan@gmail.com', // list of receivers
        subject: 'Cambio estado suscripciones', // Subject line
        text: 'Info buyersHub', // plain text body
        html: '<b>Se ha cambiado el estado de la suscripcion</b>' // html body
    };

    const enviarEmail = util.promisify(transporter.sendMail, transporter);
    return enviarEmail.call(transporter, info);
}