'use strict';

/**
 * Module dependencies.
 */

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
 
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});

};
/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(req, res) {
 
    var mailData = req.body;
    transporter.sendMail({
        from: mailData.contactEmail,
        to: 'atumachimelawilliam@gmail.com',
        subject: 'Message from ' + mailData.contactName,
        text: mailData.contactMsg
    });
 
    res.json(mailData);
};
