const express = require('express');
const path = require('path');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup render index files
app.set('view engine', 'ejs');
app.use(express.static('/views'));

// path
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/send-email', function(req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'gadipallychandra@gmail.com',
            pass: 'Chandra$123'
        }
    });
    let mailOptions = {
        from : '"Example mailer" <gadipallychandra@gmail.com>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        html: '<b>NodeJS Email Tutorial</b>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } 
        console.log('Message %s sent: %s', info.messageId, info.response); 
        res.render('index');
    });
});
// port
app.listen(port, function(req, res) {
    console.log('Server is running at port : ',port);
});