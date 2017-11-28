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

// funcao para preencher uma prescricao
var preenchePrescricao = function (qtd, valPresc, apt) {

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

// funcao ir buscar mail do utente e pedir o envio do mail 
var enviaMail = function (receita) {
    Pessoa.findById(receita.utente, function (err, pessoa) {
        if (err) return res.status(500).send('Erro ao encrontrar a Pessoa!');
        if (!pessoa) return res.status(404).send('Não encontrou a Pessoa com id indicado!');
        var mail = pessoa.email;
        var codigoReceita = receita.num_receita;
        sendEmail(mail, codigoReceita);
    });
}

// funcao para enviar email por mail.smtp2go.com
var sendEmail = function (to, codigoReceita) {

    var transporter = nodemailer.createTransport({
        host: "mail.smtp2go.com",
        port: 2525,
        auth: {
            user: config.mailUser,
            pass: config.mailPass
        }
    })

    transporter.sendMail({
        from: "arqsi_teste@isep.ipp.pt",
        to: to,
        subject: "Receita Registada",
        text: "Vimos por este meio, informar que foi registada uma receita com o código "+ codigoReceita + "."
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Mensagem enviada!");
        }
    });
}

// funcao para receber utente inserido
var preencheUtente = function (nifUtente) {
    return new Promise(function (resolve, reject) {

        Pessoa.findOne({
            nif: nifUtente
        }, function (err, pessoa) {
            resolve(pessoa)
        });

    });
};

// middleware to use for all requests
router.use(function (req, res, next) {

    // do logging
    console.log('Verificando o token.');
    var token = config.token;
    // decode token
    if (token) {


        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {

            var tokDec = jwt.decode(token);

            if (! (tokDec.medico || tokDec.farmaceutico || tokDec.utente) ) {
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

// ********************* ROUTES de RECEITA *********************
// GET http://localhost:8080/receita)
router.route('/')
    // get todas as receitas
    .get(function (req, res) {

        var tokDec = jwt.decode(config.token);
        
            //MEDICO LÊ SE AUTOR DA RECEITA
            if(tokDec.medico){
                var idMedico=JSON.stringify(tokDec.id);
                var idMed=JSON.parse(idMedico);

                Receita.find({
                    medico: idMed
                },function (err, receitas) {
                    if(receitas!=undefined)
                        res.json(receitas);
                    else
                        return res.status(400).send("Medico não tem receitas registadas");    
                });
            }
            /*
        Receita.find(function (err, receitas) {
            if (err)
                res.send(err);

            res.json(receitas);
        });*/
    })

    // cria receita 
    .post(function (req, res) {

        var receita = new Receita();      // create a new instance of the Receita model

        receita.num_receita = req.body.num_receita;
        receita.cod_acesso = req.body.cod_acesso;
        receita.data = req.body.data;
        receita.local = req.body.local;

        //   receita.medico = req.body.medico;

        var tokDec = jwt.decode(config.token);
        var nifMedico = JSON.stringify(tokDec.assinMedico);

        Pessoa.findOne({
            nif: nifMedico
        }, function (err, pessoa) {
            if (pessoa != undefined)
                receita.medico = pessoa;
            else
                return res.status(400).send("Erro ao registar o médico!");
        });

        var bodyUtente = req.body.utente;

        //descobrindo o nif
        var utenteParse = JSON.stringify(bodyUtente);
        var countUtente = utenteParse.length;

        if (countUtente == 9) {
            var nifUtente = req.body.utente;
        } else {

            if(req.body.utente!=undefined){
                //descobrindo o nif
                var bodyPostUtente = req.body.utente;
                var utenteBodyParse = JSON.stringify(bodyPostUtente);
                var countBodyUtente = utenteBodyParse.length;

                if (countBodyUtente != 9) {
                    return res.status(400).send('Verifique por favor se introduziu 9 digitos no nif');
                } else {
                    var nifUtente = req.body.utente.nif;
                }
            }
        }
        if(nifUtente==null)
            return res.status(400).send('Não foi possível encontrar o utente');

        mongoose.Promise = global.Promise;
        var insereUtente = preencheUtente(nifUtente)
            .then(utente => {

                if (utente == null)
                    return res.status(400).send("Utente não registado")

                if (utente != undefined)
                    receita.utente = utente;

                // ciclo para 
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
                                presc = preenchePrescricao(qtd, valPresc, apt1);
                                receita.prescricoes.push(presc);
                                callback();
                            });
                    }
                }, function (err) {
                    receita.save(function (err) {
                        if (err)
                            return res.status(500).send("Erro ao registar a receita!")
                        res.json({ message: 'Receita registada!', receita });
                        enviaMail(receita);
                    })
                });
            })
    });

// on routes that end in /receita/:id
router.route('/:id')
    // get the receita with that id (accessed at GET http://localhost:8080/receita/:id)
    .get(function (req, res) {
        Receita.findById(req.params.id, function (err, receita) {
            if (err)
                res.send(err);
            res.json(receita);
        });
    });

// GET http://localhost:8080/receita/:receita_id/prescricao/:id
router.route('/:receita_id/prescricao/:id')
    .get(function (req, res) {
        Receita.findById(req.params.receita_id, function (err, receita) {
            if (err) return res.status(500).send("there was a problem finding the receita");
            if (!receita) return res.status(404).send("Get receita failed.");
            var ret = receita.prescricoes.find(o => o.id === req.params.id);
            res.status(200).send(ret);
        });
    });



module.exports = router;