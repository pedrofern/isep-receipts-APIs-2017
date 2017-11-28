var express = require('express');
var router = express.Router();              // get an instance of the express Router
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('../config');

var Pessoa = require('../app/models/pessoa');

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Autenticacao a decorrer.');
    next();

});

router.route('/')

    .get(function (req, res) {

        Pessoa.find({}, function (err, pessoas) {

            res.json(pessoas);
        });
    })

    .post(function (req, res, token) {

        // find the user
        Pessoa.findOne({
            nif: req.body.nif
        }, function (err, pessoa) {

            if (err) throw err;

            if (!pessoa) {
                return res.status(400).send("Autenticacao falhada!");
            } else if (pessoa) {

                var checkPass=bcrypt.compareSync(req.body.password,pessoa.password);
                // check if password matches
                if (!checkPass) {
                    res.json({ success: false, message: 'Autenticacao falhada!' });
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const payload = {
                        id:pessoa.id,
                        medico:pessoa.medico,
                        assinMedico:pessoa.nif,
                        farmaceutico:pessoa.farmaceutico,
                        utente: pessoa.utente
                    };
                 
                    var token = jwt.sign(payload, config.secret,{
                        expiresIn: 24 * 60 * 60, // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Aproveita o token!',
                        token: token
                    });

                    config.token=token;
                }
            }

        });
    });


module.exports = router;