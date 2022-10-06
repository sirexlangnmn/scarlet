module.exports = (app) => {
    const USERS_ACCOUNTS = require('../query/users_accounts.query.js');
    const RESET_TOKENS = require('../query/reset_tokens.query.js');

    const express = require('express');
    const path = require('path');
    const nodemailer = require('nodemailer');
    const hbs = require('nodemailer-express-handlebars');
    app.use(express.static(path.join(__dirname, '../../', 'public')));

    const mysql = require('mysql2');
    const jwt = require('jsonwebtoken');
    const CryptoJS = require('crypto-js');
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    const JWT_SECRET = process.env.JWT_SECRET;
    const AWT_HOSTNAME = process.env.AWT_HOSTNAME;

    // Database connection
    const db = mysql.createConnection({
        host: process.env.DB_SERVERHOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    db.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });

    app.get(['/forgot-password'], (req, res) => {
        res.render(path.join(__dirname, '../../', 'public/view/forgot-password/index'));
    });

    app.post('/api/post/create-reset-token', async function (req, res, next) {
        let uuid = req.body.uuid;
        let password = req.body.password;
        let receiverEmailAddress = req.body.email_or_social_media;

        const PAYLOAD = {
            password: password,
        };

        const SECRET = JWT_SECRET + password;
        const TOKEN = jwt.sign(PAYLOAD, SECRET, { expiresIn: '15m' });

        // Encrypt
        let ciphertext = CryptoJS.AES.encrypt(TOKEN, SECRET).toString();
        let encoded = encodeURIComponent(ciphertext);
        let decoded = decodeURIComponent(encoded);
        let bytes = CryptoJS.AES.decrypt(decoded, SECRET);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        const LINK = AWT_HOSTNAME + `reset-password/${encoded}`;
        var expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        let datetime = currentDatetime();

        const resetTokensObject = {
            token: originalText,
            expiration: expireDate,
            uuid: uuid,
            updatedAt: datetime,
        };

        const emailObject = {
            message: 'reset tokens saved',
            uuid: uuid,
            link: LINK,
            receiverEmailAddress: receiverEmailAddress,
        };

        db.query(RESET_TOKENS.CREATE, Object.values(resetTokensObject), (err, rows) => {
            if (err) {
                //throw err;
                console.log(err);
            } else {
                res.send(emailObject);
                return;
            }
        });
    });

    app.post('/api/post/send-email-for-change-password', (req, res) => {
        let uuid = req.body.uuid;
        let link = req.body.link;
        let receiverEmailAddress = req.body.receiverEmailAddress;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVERHOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('./public/view/email'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./public/view/email'),
            extName: '.handlebars',
        };

        transporter.use('compile', hbs(handlebarOptions));

        // setup email data with unicode symbols
        let mailOptions = {
            from: process.env.EMAIL_SENDER_ADDRESS,
            to: receiverEmailAddress,
            subject: 'Request For Change Password',
            template: 'request-for-change-password',
            context: {
                code: uuid,
                link: link,
            },
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // return error;
            } else {
                res.send('email sent');
                console.log('Email has been sent');
            }
            // console.log('Message sent info: ', info);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // res.render('Email has been sent');
        });
    });

    User = (req, res) => {
        let email = req.where.email;

        return new Promise((resolve, reject) => {
            db.query(USERS_ACCOUNTS.GET_BY_EMAIL, [email], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    // app.get(['/reset-password/:token'], (req, res) => {
    app.get(['/reset-password/:token'], async function (req, res, next) {
        const token = req.params.token;
        //res.send(req.params)

        const EMAIL = req.session.forgotPassword.email_or_social_media;
        const PASSWORD = req.session.forgotPassword.password;
        const UUID = req.session.forgotPassword.uuid;
        const SECRET = JWT_SECRET + PASSWORD;

        let decoded = decodeURIComponent(token);
        let bytes = CryptoJS.AES.decrypt(decoded, SECRET);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        var email = await User({ where: { email: EMAIL } });
        console.log('2email:');
        console.log(email);

        try {
            const PAYLOAD = jwt.verify(originalText, SECRET);
            res.render(path.join(__dirname, '../../', 'public/view/reset-password/index'), { email: EMAIL });
        } catch (error) {
            console.log(error.messages);
            res.send(error.message);
        }
    });

    app.post(['/reset-password/:token'], (req, res) => {
        const token = req.params.token;
        const { password, password2, password3 } = req.body;

        const EMAIL = req.session.forgotPassword.email_or_social_media;
        const PASSWORD = req.session.forgotPassword.password;
        const UUID = req.session.forgotPassword.uuid;
        const SECRET = JWT_SECRET + PASSWORD;

        let decoded = decodeURIComponent(token);
        let bytes = CryptoJS.AES.decrypt(decoded, SECRET);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        // if (uuid !== UUID) {
        //     res.send('Invalid link');
        //     return;
        // }

        try {
            const PAYLOAD = jwt.verify(originalText, SECRET);

            const inputObject = {
                password: password3,
            };

            db.query(USERS_ACCOUNTS.UPDATE_PASSWORD, [...Object.values(inputObject), UUID], function (err, result) {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    console.log('reset password successfully');
                    res.send('reset password successfully');
                }
            });

            //pop up then go to login page
            // res.render(path.join(__dirname, '../../', 'public/view/reset-password/index'), { email:  EMAIL});
        } catch (error) {
            console.log(error.messages);
            res.send(error.message);
        }
    });

    function currentDatetime() {
        let date = new Date();
        let current_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let current_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let date_time = current_date + ' ' + current_time;
        return date_time;
    }
};
