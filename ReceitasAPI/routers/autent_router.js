var express = require('express');
var router = express.Router();              // get an instance of the express Router
var jwt=require('jsonwebtoken');
var Pessoa = require('../app/models/pessoa');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Autenticacao a decorrer.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')

    .get(function(req, res) {
        
        Pessoa.find({},function(err, pessoas) {
           
            res.json(pessoas);
        });
    })

    .post(function(req, res) {
        
        // find the user
        Pessoa.findOne({
            nome: req.body.nome
        }, function(err, pessoa) {

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
                expiresIn: 24*60*60 // expires in 24 hours
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