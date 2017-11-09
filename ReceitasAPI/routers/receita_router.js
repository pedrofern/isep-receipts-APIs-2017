var http = require("http");

var apt;

var options = {
    "method": "GET",
    "hostname": "medicamentosapi2017.azurewebsites.net",
    "path": "/api/Apresentacao/2",
    "headers":{
       "Content-Type":"application/json",
       "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDQyYWNlZC1kNjdlLTQzYzktODdiYS00YzMxZDcyYjRlZDIiLCJzdWIiOiJhQGEucHQiLCJleHAiOjE1MTAyNDU5MDQsImlzcyI6Imh0dHA6Ly9zZW1lbnRld2ViYXBpLmxvY2FsIiwiYXVkIjoiaHR0cDovL3NlbWVudGV3ZWJhcGkubG9jYWwifQ.TcTgPCsiE7gISTXnoiU6BGzsLwUQ2MXmp-yOL8bVA3o"
    }
};

var apresentacao = http.request(options, function(res) {
    var chunks=[];

    res.on("data", function(chunk){
        chunks.push(chunk);
        
    });

    res.on("end", function(){
        var body_apt = Buffer.concat(chunks);
        console.log(body_apt.toString()); 
        apt = JSON.parse(body_apt.toString());  
    });
    
});

apresentacao.end();

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
                    //"dose": String,
                    "via_administracao": apt.posologia,
                    //"intervalo_tempo_horas": Number,
                    //"periodo_tempo_dias": Number
                },
            }
        };

        receita.prescricoes.push(presc);

        // save the pessoa and check for errors
        receita.save(function(err) {
            if (err)
                res.send(err);

            res.json(receita);
        });

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