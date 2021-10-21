var nodemailer = require('nodemailer');

exports.email = function (userEmail, textEmail, userName) {
    var transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: 'mastershop.nodejs@gmail.com',
            pass: 'mastershop1234'
        }
    });

    var mailOptions = {
        from: 'projectstore.nodejs@gmail.com',
        to: userEmail,
        subject: ' שלום ' + userName + ' !',
        text: textEmail
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}