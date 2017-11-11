var Client = require('node-rest-client').Client;
var client = new Client();
var jwt = require('jsonwebtoken');
var config = require('../config');
var async = require('async');
var request = require("request");


var getTokenMedicamentosAPI = function () {
    return new Promise((resolve, reject) => {

        var options = {
            method: 'POST',
            url: config.urlMedicamentosToken,
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: config.loginMedicamentos
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var aux = JSON.parse(body);
            resolve(aux.token);
        });
    });
}

// funcao para fazer o get de uma apresentacao por id à Medicamentos API
var getApresentacao = function (id, apt, token) {

    return new Promise((resolve, reject) => {

        var bearer = "Bearer " + token;

        var url = config.urlApresentacoesPorId + id;
        var args = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        }
        client.get(url, args, function (data, response) {
            resolve(data);
        })
    });
}

var preencheReceita = function (req, res, qtd, valPresc, apt) {

    var presc = {
        "quantidade": qtd,
        "validade": valPresc,
        "apresentacao": {
            "id_apresentacao": apt.id,
            "forma": apt.forma_adm,
            "dosagem": apt.concentracao,
            "quantidade_embalagem": apt.qtd,
            "farmaco": apt.farmaco,
            "medicamento": apt.medicamento,
            "posologia": {
                "dose": apt.dose,
                "via_administracao": apt.via_administracao,
                "intervalo_tempo_horas": apt.intervalo_tempo_horas,
                "periodo_tempo_dias": apt.periodo_tempo_dias
            },
        }
    };

    return presc;
}

var express = require('express');
var router = express.Router();              // get an instance of the express Router

var Receita = require('../app/models/receita');

// middleware to use for all requests
router.use(function (req, res, next) {
    
        // do logging
        console.log('Verificando o token.');
        var token=config.token;
        // decode token
        if (token) {


            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
          
                var tokDec=jwt.decode(token);

                if(!tokDec.medico){
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
    // create receita (accessed at POST http://localhost:8080/receitas)
    .post(function (req, res) {

        var receita = new Receita();      // create a new instance of the Receita model

        receita.num_receita = req.body.num_receita;
        receita.cod_acesso = req.body.cod_acesso;
        receita.data = req.body.data;
        receita.local = req.body.local;
        receita.medico = req.body.medico;
        receita.utente = req.body.utente;

        async.each(req.body.prescricoes, function (prescricao, callback) {
            var idApresentacao = prescricao.id_apresentacao;
            var qtd = prescricao.quantidade;
            var valPresc = prescricao.validade;
            if (idApresentacao !== null) {
                var presc;

                var token = getTokenMedicamentosAPI()
                    .then(token =>
                        getApresentacao(idApresentacao, req, token))
                    .then(apt1 => {
                        presc = preencheReceita(req, res, qtd, valPresc, apt1);
                        receita.prescricoes.push(presc);
                        callback();
                    });
            }
        },
            function (err) {
                receita.save(function (err) {
                    if (err)
                        return res.status(500).send("Erro ao registar a receita!")
                    res.json({ message: 'Receita registada!', receita });
                })
            });
    })

    // get all receitas (accessed at GET http://localhost:8080/receitas)
    .get(function (req, res) {

        Receita.find(function (err, receitas) {
            if (err)
                res.send(err);

            res.json(receitas);
        });
    });

/*
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

// update the pessoa with this id (accessed at PUT http://localhost:8080/api/pessoas/:pessoa_id)
.put(function(req, res) {
    
    // use our bear model to find the bear we want
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

// delete the pessoa with this id (accessed at DELETE http://localhost:8080/api/pessoa/:pessoa_id)
.delete(function(req, res) {
    Pessoa.remove({
        _id: req.params.pessoa_id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json();
    });
});
*/

module.exports = router;