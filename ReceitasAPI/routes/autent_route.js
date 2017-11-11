var express = require('express');
var router = express.Router();              // get an instance of the express Router
var jwt = require('jsonwebtoken');
var Pessoa = require('../app/models/pessoa');

// middleware to use for all requests
router.use('/receitas', function (req, res, next) {
    // do logging
    console.log('Autenticacao a decorrer.');
    next(); // make sure we go to the next routes and don't stop here

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

router.route('/')

    .get(function (req, res) {

        Pessoa.find({}, function (err, pessoas) {

            res.json(pessoas);
        });
    })

    .post(function (req, res) {

        // find the user
        Pessoa.findOne({
            nome: req.body.nome
        }, function (err, pessoa) {

            if (err) throw err;

            if (!pessoa) {
                res.json({ success: false, message: 'Autenticacao falhada' });
            } else if (pessoa) {

                // check if password matches
                if (pessoa.password != req.body.password) {
                    res.json({ success: false, message: 'Autenticacao falhada' });
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const user = {
                        admin: pessoa.medico
                    };
                    var token = jwt.sign(user, 'nana', {
                        expiresIn: 24 * 60 * 60 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Aproveita o token!',
                        token: token
                    });
                }
            }

        });
    });


module.exports = router;