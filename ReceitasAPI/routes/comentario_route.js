var Client = require('node-rest-client').Client;
var client = new Client();
var jwt = require('jsonwebtoken');
var config = require('../config');
var async = require('async');
var request = require("request");
var express = require('express');
var router = express.Router();
var Receita = require('../app/models/receita');
var Pessoa = require('../app/models/pessoa');
var nodemailer = require('nodemailer');
var config = require('../config');
var mongoose = require('mongoose');

var tokenMed; // var global para acesso do token dos medicamentos

// funcao para ir receber token da aplicacao de mMedicamentosAPI
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
            tokenMed = aux.token;
            resolve(tokenMed);
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
var criaComentario = function (req, nome_medico, id_apresentacao) {
    if (id_apresentacao == undefined || id_apresentacao == null) {
        return false;
    } else {
        return new Promise((resolve, reject) => {

            var comentario =
                {
                    "ApresentacaoId": id_apresentacao,
                    "nome_medico": nome_medico,
                    "data_comentario": req.body.data_comentario,
                    "comentario_medico": req.body.comentario_medico
                }
            var bearer = "Bearer " + tokenMed;
            var options = {
                method: 'POST',
                url: config.urlComentario,
                headers:
                    {
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                        "Authorization": bearer
                    },
                body: config.loginMedicamentos,
                json: comentario
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body);
            });

        });
    }
}
var mostraMensagem = function (res, ret) {
    return new Promise((resolve, reject) => {
        if (ret == false) {
            res.status(500).json({ message: 'Apresentacao inválida!' });
        } else if (ret == undefined || ret == null) {
            res.status(500).json({ message: 'Erro ao receber dados da aplicação Medicamentos!' });
        } else {
            res.json({ message: 'Comentario realizado com sucesso!' });
        }
        resolve(res);
    });

}
// middleware to use for all requests
router.use(function (req, res, next) {

    // do logging
    console.log('Verificando o token.');
    console.log(req.headers.authorization);

    var token = req.headers.authorization;

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {

            var tokDec = jwt.decode(token);

            if (tokDec == null || tokDec == undefined || err == true) {

                return res.json({ success: false, message: 'Falha ao autenticar o token!' });

            } else if (!tokDec.medico) {

                return res.json({ success: false, message: 'Nao tem permissoes.' });

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

router.route('/')

    .post(function (req, res) {

        var tokDec = req.decoded;

        // apenas se for medico é que pode criar receitas
        if (!tokDec.medico) {
            return res.status(500).json({ success: false, message: 'Nao tem permissoes.' });
        } else {
            var ret;
            var tokenMedicamentos = getTokenMedicamentosAPI()
                .then(tokenMedicamentos =>
                    getApresentacao(req.body.ApresentacaoId, req, tokenMedicamentos))
                .then(apt1 =>
                   criaComentario(req, tokDec.nome, apt1.id, tokenMed)                    
                ).then(ret => 
                    mostraMensagem(res, ret)
                );
        }
    });

module.exports = router;