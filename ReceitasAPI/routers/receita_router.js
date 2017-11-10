var Client = require('node-rest-client').Client;
var client = new Client();
var config = require('../config');

var getApresentacao = function (id, apt){

    return new Promise((resolve, reject) => {
        /*
        var token;
        var urlToken = config.urlMedicamentosToken;
        var opt ={ 
            headers: {
                "Content-Type":"application/json"
            },
            body: { 
                "email":"a@a.pt",
                "password":"Qwerty1!"
            }
        }

        client.get( urlToken, opt, function (data, response) {
            //token = data.token;
            console.log(JSON.stringify(data));
        })
*/
        var url = config.urlApresentacoesPorId + id;
        var args = {
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWEyZWRjNy1hZjI1LTQ1NWMtYTY1Yy1mMmRjYjA0Y2ZkNTUiLCJzdWIiOiJhQGEucHQiLCJleHAiOjE1MTYzMjI3MjYsImlzcyI6Imh0dHA6Ly9zZW1lbnRld2ViYXBpLmxvY2FsIiwiYXVkIjoiaHR0cDovL3NlbWVudGV3ZWJhcGkubG9jYWwifQ.pLWWxU-x12JkC_phHzbhyXq7oEbvN5xJ6qA7v-ObXwg"  
                ////+ token + "",
            }
        }
        client.get(url, args, function (data, response) {
                resolve(data);
            })
        
    });
}

var preencheReceita = function (req, res, apt, receita){
    
    return new Promise((resolve, reject) => {

        console.log(apt);
        console.log('TESTE **********************');

        var presc = {
            "quantidade": req.body.prescricoes.quantidade,
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

        receita.prescricoes.push(presc);

        resolve(receita);
    });
}

var guardaReceita = function (receita){
    
    return new Promise((resolve, reject) => {

        // save the pessoa and check for errors
        receita.save(function(err) {
            if (err)
                res.send(err);

            res.json(receita);
        });

        resolve(receita);
    });
}

var express = require('express');
var router = express.Router();              // get an instance of the express Router

var Receita = require('../app/models/receita');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router.route('/')
    // create receita (accessed at POST http://localhost:8080/receitas)
    .post(function(req, res) {

        var receita = new Receita();      // create a new instance of the Receita model
        
         receita.num_receita = req.body.num_receita;
         receita.cod_acesso = req.body.cod_acesso;
         receita.data = req.body.data;
         receita.validade = req.body.validade;
         receita.local = req.body.local;
         receita.medico = req.body.medico;
         receita.utente = req.body.utente;

        var ids_apt;
       // for (let i = 0; i <2;i++){
         //   console.log(i);

         for (let i = 0; i < req.body.prescricoes.length; i++) {
            var apID = req.body.prescricoes[i].id_apresentacao;
            if(apID !== null){
                receita.prescricoes.push(req.body.prescricoes[i]);
                //getApresentacoes(req).then(x => console.log('Result: '+x));
                getApresentacoes(apID,req).then(x => receita.prescricoes[i].apresentacao = x);
    
            }
        }
        
        getApresentacao(ids_apt).then(apt1 => {
            preencheReceita(req, res, apt1, receita)})
            .then(guardaReceita);

            guardaReceita();
    })

    // get all receitas (accessed at GET http://localhost:8080/receitas)
    .get(function(req, res) {

        Receita.find(function(err, receitas) {
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