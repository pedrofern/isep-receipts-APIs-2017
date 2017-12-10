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
        },
        "fechada": false
    };

    return presc;
}

// funcao ir buscar mail do utente e pedir o envio do mail 
var enviaMail = function (receita) {
    Pessoa.findById(receita.utente, function (err, pessoa) {
        if (err) return res.status(500).send('Erro ao encrontrar a Pessoa!');
        if (!pessoa) return res.status(404).send('Não encontrou a Pessoa com id indicado!');
        var mail = pessoa.email;
        var codigoReceita = receita._id;
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
        text: "Vimos por este meio, informar que foi registada uma receita com o código " + codigoReceita + "."
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

var criaReceita = function (receita, req, res, tokDec) {
    receita.data = req.body.data;
    receita.local = req.body.local;

    //   receita.medico = req.body.medico;
    var nifMedico = JSON.stringify(tokDec.nif);

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

    if (countUtente == 11) {
        var nifUtente = req.body.utente;
    } else {

        //descobrindo o nif
        var bodyPostUtente = req.body.utente;
        var utenteBodyParse = JSON.stringify(bodyPostUtente.nif);
        var countBodyUtente = utenteBodyParse.length;

        if (countBodyUtente != 9) {
            return res.send.json('Verifique por favor se introduziu 9 digitos no nif');
        } else {
            var nifUtente = req.body.utente.nif;
        }
    }
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
                if(idApresentacao==undefined)
                    idApresentacao=prescricao.apresentacao.id_apresentacao;
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
}

// middleware to use for all requests
router.use(function (req, res, next) {

    // do logging
    console.log('Verificando o token.');
  
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

// ********************* ROUTES de RECEITA *********************
// GET http://localhost:8080/receita)
router.route('/')
    // get todas as receitas
    .get(function (req, res) {

        var tokDec = req.decoded;
        //MEDICO LÊ SE AUTOR DA RECEITA
        if (tokDec.medico) {
            var idMedico = tokDec.id;

            Receita.find({
                medico: idMedico
            }, function (err, receitas) {
                if (receitas != undefined)
                    res.json(receitas);
                else
                    return res.status(400).send("Medico não tem receitas registadas");
            });
        }

        //UTENTE LÊ SE RECEITA FOR PARA SI
        if (tokDec.utente) {
            var idUtente = tokDec.id;

            Receita.find({
                utente: idUtente
            }, function (err, receitas) {
                if (receitas != undefined)
                    res.json(receitas);
                else
                    return res.status(400).send("Utente não tem receitas registadas");
            });
        }

        if (tokDec.farmaceutico) {
            return res.status(400).send("Tem de ter o id da receita!");
        }
    })

    // cria receita 
    .post(function (req, res) {

        var tokDec = req.decoded;

        // apenas se for medico é que pode criar receitas
        if (!tokDec.medico) {
            return res.status(500).json({ success: false, message: 'Nao tem permissoes.' });
        } else {

            var receita = new Receita();      // create a new instance of the Receita model
            criaReceita(receita, req, res, tokDec);
        }
    });

// on routes that end in /receita/:id
router.route('/:id')
    // get the receita with that id (accessed at GET http://localhost:8080/receita/:id)
    .get(function (req, res) {
        var tokDec = req.decoded;

        Receita.findById(req.params.id, function (err, receita) {
            if (err) return res.status(500).send("Erro ao encrontrar a Receita!");
            if (!receita) return res.status(404).send("Nao foi encontrada receita com id indicado!");

            if (tokDec.medico) {
                if (receita.medico.toString() == tokDec.id) {
                    return res.status(200).send(receita);
                } else {
                    return res.json({ success: false, message: 'A receita não foi prescrita por si!' });
                }
            } else if (tokDec.farmaceutico) {
                // no caso de farmaceutico pode ler desde que tenha o identificador da receita, que é este o caso
                return res.status(200).send(receita);

            } else if (tokDec.utente) {
                if (receita.utente.toString() == tokDec.id) {
                    return res.status(200).send(receita);
                } else {
                    return res.json({ success: false, message: 'A receita não lhe pertence!' });
                }

            } else {
                return res.json({ success: false, message: 'Nao tem permissoes.' });
            }
        });

    })
    .put(function (req, res) {

        var tokDec = req.decoded;

        // apenas se for medico é que pode criar receitas
        if (tokDec.medico) {

            Receita.findById(req.params.id, function (err, receita) {
                if (err) return res.status(500).send("Erro ao encrontrar a Receita!");
                if (!receita) return res.status(404).send("Nao foi encontrada receita com id indicado!");

                var idMedicoReceita = receita.medico.toString();
                var idMedicoToken = tokDec.id;

                if (idMedicoToken != idMedicoReceita) {
                    return res.status(500).send("Esta receita não foi criada por si!");
                } else {

                    // verifica se ja existiram aviamentos
                    var t = receita.prescricoes.length;
                    for (let i = 0; i < t; i++) {
                        if (!(receita.prescricoes[i].aviamentos.length == 0)) {
                            return res.status(500).send("Não é possivel efetuar alteração na receita, pois já existem aviamentos efectuados!");
                        }
                    }

                    receita.prescricoes = [];

                    // faz o update da receita
                    criaReceita(receita, req, res, tokDec);

                }
            });
        } else {
            return res.status(500).json({ success: false, message: 'Nao tem permissoes.' });
        }

    });

// GET http://localhost:8080/receita/:receita_id/prescricao/:id
router.route('/:receita_id/prescricao/:id')
    .get(function (req, res) {
        var tokDec = req.decoded;

        Receita.findById(req.params.receita_id, function (err, receita) {
            if (err) return res.status(500).send("Erro ao encrontrar a Receita!");
            if (!receita) return res.status(404).send("Nao foi encontrada receita com id indicado!");

            var ret = receita.prescricoes.find(o => o.id === req.params.id);

            if (tokDec.medico) {
                if (receita.medico.toString() == tokDec.id) {
                    return res.status(200).send(ret);
                } else {
                    return res.json({ success: false, message: 'A receita não foi prescrita por si!' });
                }
            } else if (tokDec.farmaceutico) {
                // no caso de farmaceutico pode ler desde que tenha o identificador da receita, que é este o caso
                return res.status(200).send(ret);

            } else if (tokDec.utente) {
                if (receita.utente.toString() == tokDec.id) {
                    return res.status(200).send(ret);
                } else {
                    return res.json({ success: false, message: 'A receita não lhe pertence!' });
                }

            } else {
                return res.json({ success: false, message: 'Nao tem permissoes.' });
            }
        });
    });



// PUT http://localhost:8080/receita/:receita_id/prescricao/:id/aviar
router.route('/:receita_id/prescricao/:id/aviar')
    .put(function (req, res) {

        var tokDec = req.decoded;

        if (tokDec.farmaceutico) {

            Receita.findById(req.params.receita_id, function (err, receita) {
                if (err) return res.status(500).send("Erro ao encrontrar a Receita!");
                if (!receita) return res.status(404).send("Nao foi encontrada receita com id indicado!");
                var quantidadesAviadas = 0;
                var t = receita.prescricoes.length;
                for (let i = 0; i < t; i++) {
                    if (receita.prescricoes[i].id === req.params.id) {
                        if (receita.prescricoes[i].fechada == true) {
                            break;
                        };
                        for (let j = 0; j < receita.prescricoes[i].aviamentos.length; j++) {
                            var number = receita.prescricoes[i].aviamentos[j].quantidade;
                            quantidadesAviadas += number;
                        }
                        var quantidadeTotalPrescrita = receita.prescricoes[i].quantidade;
                        var qtdPossiveisPrescricao = quantidadeTotalPrescrita - quantidadesAviadas;
                        if (qtdPossiveisPrescricao > 0 && qtdPossiveisPrescricao <= quantidadeTotalPrescrita) {
                           
                             var tam2 = req.body.aviamentos.length;
                            for (let k = 0; k < tam2; k++) {
                                var novoAviamento = {
                                    // coloca automaticamente o id do farmaceutico na prescricao
                                    "farmaceutico": tokDec.id,
                                    "data_aviamento": new Date(Date.now()),
                                    "quantidade": req.body.aviamentos[k].quantidade
                                };
                                var novaQuant = qtdPossiveisPrescricao - req.body.aviamentos[k].quantidade;
                                if (novaQuant > 0) {
                                    receita.prescricoes[i].aviamentos.push(novoAviamento);
                                } else if (novaQuant == 0) {
                                    receita.prescricoes[i].fechada = true;
                                    receita.prescricoes[i].aviamentos.push(novoAviamento);
                                } else {
                                    return res.status(500).send("Demasiados aviamentos para a quantidade prescrita!")
                                }
                            }
                        }

                    }
                }
                receita.save(function (err) {
                    if (err)
                        return res.status(500).send("Erro ao fazer update da receita!")
                    res.json({ message: 'Update da receita realizado com sucesso!', receita });
                })
            });

        } else {
            return res.status(500).json({ success: false, message: 'Nao tem permissoes.' });
        }

    });

module.exports = router;