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
    // create pessoa (accessed at POST http://localhost:8080/pessoas)
    .post(function(req, res) {
    
        var pessoa = new Pessoa();      // create a new instance of the Pessoa model
        
        pessoa.email = req.body.email;
        pessoa.password = req.body.password;
        pessoa.papel = req.body.papel;
        pessoa.nome = req.body.nome;
        pessoa.nif = req.body.nif;
        pessoa.num_beneficiario = req.body.num_beneficiario;

        // save the pessoa and check for errors
        pessoa.save(function(err) {
            if (err)
                res.send(err);

            res.json(pessoa);
        });

    })

    // get all pessoas (accessed at GET http://localhost:8080/pessoas)
    .get(function(req, res) {

        Pessoa.find(function(err, pessoas) {
            if (err)
                res.send(err);

            res.json(pessoas);
        });
    });

    // on routes that end in /pessoas/:pessoa_id
// ----------------------------------------------------
router.route('/:pessoa_id')

    // get the pessoa with that id (accessed at GET http://localhost:8080/pessoas/:pessoa_id)
    .get(function(req, res) {
        Pessoa.findById(req.params.pessoa_id, function(err, pessoa) {
            if (err)
                res.send(err);
            res.json(pessoa);
        });
    })

    // update the pessoa with this id (accessed at PUT http://localhost:8080/pessoas/:pessoa_id)
    .put(function(req, res) {

        Pessoa.findById(req.params.pessoa_id, function(err, pessoa) {

            if (err)
                res.send(err);

            pessoa.nome = req.body.nome;  // update the pessoa info

            // save the pessoa
            pessoa.save(function(err) {
                if (err)
                    res.send(err);

                res.json(pessoa);
            });

        });
    })

    // delete the pessoa with this id (accessed at DELETE http://localhost:8080/pessoa/:pessoa_id)
    .delete(function(req, res) {
        Pessoa.remove({
            _id: req.params.pessoa_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json();
        });
    });
        
module.exports = router;