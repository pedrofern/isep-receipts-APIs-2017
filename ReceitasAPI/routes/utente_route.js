var express = require('express');
var router = express.Router();              // get an instance of the express Router
var config = require('../config');
var jwt = require('jsonwebtoken');

var Pessoa = require('../app/models/pessoa');
var Receita = require('../app/models/receita');

var naoEutente = function () {

    return new Promise((resolve, reject) => {

        // do logging
        console.log('Verificando o token.');
        var token = config.token;
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {

                var tokDec = jwt.decode(token);

                if (tokDec.utente) {
                    resolve('Erro');
                }

                if (err) {
                    resolve('Erro');
                } else {
                    // if everything is good, save to request for use in other routes
                    resolve('Validado');
                }
            });

        } else {

            // if there is no token
            resolve('Erro');
        }
    });
}

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router.route('/')

    // get all pessoas which are utente (accessed at GET http://localhost:8080/utente)
    .get(function (req, res) {
        var promise1 = naoEutente().then(function (data) {

            if (data == 'Erro') {
                res.json({ success: false, message: 'Nao autenticado/permitido.' });
            } else {
                Pessoa.find({
                    utente: true
                }, function (err, utentes) {
                    if (err)
                        res.send(err);

                    res.json(utentes);

                });
            }
        }).catch(console.error);
    });

// on routes that end in /utente/:utente_id
// ----------------------------------------------------
router.route('/:utente_id')

    // get the pessoa with that id (accessed at GET http://localhost:8080/utente/:utente_id)
    .get(function (req, res) {
        Pessoa.findById(req.params.utente_id, function (err, utente) {
            if (err)
                res.send(err);
            if (utente.utente) {
                res.json(utente);
            } else {
                res.json({ success: false, message: 'Nao e utente.' });
            }

        });
    });

// utente/{id}/prescricao/poraviar/{?data}
router.get('/:utente_id/prescricao/poraviar/:a?', function (req, res) {
    var query = { utente: req.params.utente_id };
    Receita.find({}).where(query).exec(function (err, receitas) {
        if (err) res.send(err);
        var prescricoes = [];
        receitas.forEach(function (receita) {
            if (req.params.a) {
                receita.prescricoes.forEach(function (prescricao) {
                    if (new Date(prescricao.validade) <= new Date(req.params.a)) {
                        // true a receita ta aberta, false a receita ta fechada
                        if (prescricao.fechada === false)
                            prescricoes.push(prescricao);
                    }
                });
            } else {
                receita.prescricoes.forEach(function (prescricao) {
                    // true a receita ta aberta, false a receita ta fechada
                    if (prescricao.fechada === false)
                        prescricoes.push(prescricao);
                });
            }
        });
        if (prescricoes.length > 0) {
            res.send(prescricoes);
        } else {
            res.send("Nao Foram Encontradas Prescrições para a data indicada.");
        }
    });
});


module.exports = router;