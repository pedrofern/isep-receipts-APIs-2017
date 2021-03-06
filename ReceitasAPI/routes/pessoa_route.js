var express = require('express');
var router = express.Router();              // get an instance of the express Router
var bcrypt = require('bcryptjs');

var Pessoa = require('../app/models/pessoa');

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

var existeNif = function (nifProcurado) {

    return new Promise((resolve) => {

        //valida se existe pessoa com o nif 
        Pessoa.findOne({
            nif: nifProcurado
        }, function (err, pessoa) {
            if (pessoa != null) {
                resolve(pessoa);
            } else {
                resolve(false);
            }
            resolve(err);
        });
    });
}

// more routes for our API will happen here
router.route('/')
    // create pessoa (accessed at POST http://localhost:8080/pessoas)
    .post(function (req, res) {

        var promise1 = existeNif(req.body.nif).then(function (data) {

            if (data != false) {
                res.status(401).send('NIF inserido já se encontra no sistema!');
            } else {
                if (req.body.nif < 100000000 || req.body.nif > 999999999) {
                    res.status(401).send('NIF não tem 9 digitos!');
                } else {

                    var pessoa = new Pessoa();      // create a new instance of the Pessoa model
                    pessoa.nif = req.body.nif;
                    pessoa.email = req.body.email;
                    var hashedPassword = bcrypt.hashSync(req.body.password);
                    pessoa.password = hashedPassword;
                    pessoa.nome = req.body.nome;
                    pessoa.nif = req.body.nif;
                    pessoa.num_beneficiario = req.body.num_beneficiario;
                    pessoa.medico = false;
                    pessoa.utente = true;
                    pessoa.farmaceutico = false;
                    /*
                    IT3 - deixou de ser permitido existir registos de medicos e farmaceuticos, apenas de anonimos em utentes
                    pessoa.medico = req.body.medico;
                    pessoa.utente = req.body.utente;
                    pessoa.farmaceutico = req.body.farmaceutico;
                    */
                    // save the pessoa and check for errors
                    pessoa.save(function (err) {
                        if (err)
                            res.send(err);

                        res.json(pessoa);
                    });

                }
            }
        }).catch(console.error);
    })

    // apenas para testes
    // get all pessoas (accessed at GET http://localhost:8080/pessoas)
    .get(function (req, res) {

        Pessoa.find(function (err, pessoas) {
            if (err)
                res.send(err);

            res.json(pessoas);
        });
    });

// on routes that end in /pessoas/:pessoa_id
// ----------------------------------------------------
router.route('/:pessoa_id')
    /*

    Desta forma, seria possivel ver os dados de todos os utilizadores

    // get the pessoa with that id (accessed at GET http://localhost:8080/pessoa/:id)
    .get(function (req, res) {
        Pessoa.findById(req.params.pessoa_id, function (err, pessoa) {
            if (err)
                res.send(err);
            res.json(pessoa);
        });
    })
    
    // update the pessoa with this id (accessed at PUT http://localhost:8080/pessoas/:pessoa_id)
    .put(function (req, res) {

        Pessoa.findById(req.params.pessoa_id, function (err, pessoa) {

            if (err)
                res.send(err);

            pessoa.nome = req.body.nome;  // update the pessoa info

            // save the pessoa
            pessoa.save(function (err) {
                if (err)
                    res.send(err);

                res.json(pessoa);
            });

        });
    })
    
    // delete the pessoa with this id (accessed at DELETE http://localhost:8080/pessoa/:pessoa_id)
    .delete(function (req, res) {
        Pessoa.remove({
            _id: req.params.pessoa_id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json();
        });
    })
    */
    ;

module.exports = router;