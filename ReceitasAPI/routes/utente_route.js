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
    console.log(req.headers.authorization);

    var token = req.headers['x-access-token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {

            var tokDec = jwt.decode(token);

            if (!(tokDec.medico || tokDec.farmaceutico || tokDec.utente)) {
                return res.json({ success: false, message: 'Nao tem permissoes.' });
            }

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
            message: 'Não encontramos o token.'
        });
    }

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
        Pessoa.findById(req.params.utente_id, function (err, pessoa) {
            if (err)
                return res.send(err);
            if (pessoa == null || pessoa == undefined) {
                return res.status(500).json("Não tem permissões de acesso!");
            } else {
                if (pessoa.utente == null || pessoa.utente == undefined || pessoa.utente == false) {
                    return res.status(500).json({ success: false, message: 'Nao e utente.' });
                } else {
                    return res.json(pessoa);
                }
            }
        });
    });

router.route('/:utente_id/expirando')

    .get(function (req, res) {
        var tokDec = req.decoded;
        if (tokDec.utente && req.params.utente_id == tokDec.id) {

            Pessoa.findById(tokDec.id, function (err, pessoa) {
                if (err)
                    res.send(err);
                if (pessoa.utente) {
                    Receita.find({
                        utente: req.params.utente_id
                    }, function (err, receitasPessoa) {
                        if (err) res.send(err);

                        var prescricoes_alerta = [];
                        receitasPessoa.forEach(function (receita) {

                            receita.prescricoes.forEach(function (prescricao) {
                                if (prescricao.fechada == false) {
                                    var data_atual = new Date();
                                    var data_prescricao = new Date(prescricao.validade);
                                    var data_pesquisa = new Date(data_prescricao.setTime(data_prescricao.getTime() - config.num_dias_alerta * 86400000));
                                    if (data_atual >= data_prescricao && data_prescricao >= data_pesquisa) {
                                        // true a receita ta aberta, false a receita ta fechada
                                        if (prescricao.fechada === false) {
                                            var presc = {
                                                "prescricao_id": prescricao._id,
                                                "prescricao_validade": prescricao.validade,
                                                "receita_id": receita._id,
                                            }
                                            prescricoes_alerta.push(presc);
                                        }
                                    }
                                }
                            });

                        });

                        res.json(prescricoes_alerta);


                    });
                } else {
                    res.json({ success: false, message: 'Nao e utente.' });
                }

            });


        } else {
            return res.json({ success: false, message: 'Nao tem permissoes.' });
        }






    });

// utente/{id}/prescricao/poraviar/{?data}
router.route('/:utente_id/prescricao/poraviar/:a?')
    .get(function (req, res) {
        var tokDec = req.decoded;
        var idToken = tokDec.id;

        if (req.params.utente_id != idToken) {
            res.json({ success: false, message: 'Não tem permissões para ver prescricoes de outros utentes!' });
        } else {

            Receita.find({
                utente: req.params.utente_id
            }, function (err, receitas) {
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
                                prescricoes.push(prescricao, receita._id);
                        });
                    }
                });
                if (prescricoes.length > 0) {
                    res.send(prescricoes);
                } else {
                    res.send("Nao Foram Encontradas Prescrições para a data indicada.");
                }
            });

        }

    });


module.exports = router;