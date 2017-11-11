var express = require('express');
var router = express.Router();              // get an instance of the express Router

var Pessoa = require('../app/models/pessoa');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router.route('/')

 // get all pessoas which are utente (accessed at GET http://localhost:8080/utente)
 .get(function(req, res) {
        Pessoa.find( {
            utente: true
        }, function(err, utentes) {
            if (err)
                res.send(err);

            res.json(utentes);
        });
    });
   
    // on routes that end in /utente/:utente_id
// ----------------------------------------------------
router.route('/:utente_id')

    // get the pessoa with that id (accessed at GET http://localhost:8080/utente/:utente_id)
    .get(function(req, res) {
        Pessoa.find(req.params.utente_id, function(err, utente) {
            if (err)
                res.send(err);
            if(utente.utente)
               res.json(utente);
            else
                res.json({ success: false, message: 'Nao e utente' });
        });
    })
        
module.exports = router;