// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');

// alertas
var Receita = require('./app/models/receita');
var Pessoa = require('./app/models/pessoa');
var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');

//database
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.database, { useMongoClient: true });
var User = require('./app/models/pessoa'); // get our mongoose model

app.set('superSecret', config.secret);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use morgan to log requests to the console
app.use(morgan('dev'));

app.set('superSecret', config.secret);

//add possibility to connect to Angular app
var cors = require('cors');
app.use(cors());

// alertas para os mails dos utentes a 3 dias de expirar
var num_dias_alerta = config.num_dias_alerta;
var job = new CronJob('00 30 23 * * *', function () {
    /*
    * Runs every day 
    * at 23:20:00 AM. 
    */  
    Pessoa.find(function (err, todasPessoas) {
        if (err) res.send(err);

        for (let i = 0; i < todasPessoas.length; i++) {
            Receita.find({
                utente: todasPessoas[i]._id
            }, function (err, receitasPessoa) {
                if (err) res.send(err);

                var prescricoes_alerta = [];
                receitasPessoa.forEach(function (receita) {
                    
                    receita.prescricoes.forEach(function (prescricao) {
                        if (prescricao.fechada == false) {
                            var data_atual = new Date().toISOString().substring(0, 10);
                            var data_validade = new Date(prescricao.validade).toISOString().substring(0, 10);
                            var data_pesquisa = new Date(new Date().setTime(new Date().getTime() + num_dias_alerta * 86400000)).toISOString().substring(0, 10);
                            if ( data_pesquisa >= data_validade && data_atual <= data_validade){ //  &&  data_validade >= data_pesquisa ) {
                                // true a receita ta fechada, false a receita ta aberta
                                if (prescricao.fechada === false) {
                                    var presc={
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

                if(prescricoes_alerta.length > 0){
                    var pres = [];
                    for (let i = 0; i < prescricoes_alerta.length; i++){
                        var aux = prescricoes_alerta[i];
                        var aux_data = prescricoes_alerta[i].prescricao_validade.toISOString().substring(0, 10);
                        pres[i] = "Prescrição "
                                +  prescricoes_alerta[i].prescricao_id 
                                + " da Receita " + prescricoes_alerta[i].receita_id
                                + " com a validade até " + aux_data;
                    }
                    var env = pres.toString();
                    var formattedString = env.split(",").join("\n")
                    sendEmail(todasPessoas[i].email, todasPessoas[i].nome,
                            formattedString);
                }
                

            });
        }

    });


}, null,
    true /* Start the job right now */
);

// funcao para enviar email por mail.smtp2go.com
var sendEmail = function (to, nome, info) {
    
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
            subject: "Prescrições de Receitas a Expirar dentro de " + num_dias_alerta +" dias",
            text: "Exmo Senhor, " + nome +
            "\nVimos por este meio, informar que tem as seguintes prescrições a expirar dentro de  " 
            + num_dias_alerta + " dias:" + "\n" + info
        }, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mensagem enviada!");
            }
        });
    }


// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'BENVINDO! GESTÃO RECEITAS!!!' });
});
app.use('/home', router);

// ======= AUTENTICACAO ========
var autenticacoes = require('./routes/autent_route');

// ======= PESSOAS ==========
var pessoas = require('./routes/pessoa_route');
var receitas = require('./routes/receita_route');
var utentes = require('./routes/utente_route');
var comentarios = require('./routes/comentario_route');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /

app.use('/autenticacao', autenticacoes);
app.use('/pessoas', pessoas);
app.use('/receita', receitas);
app.use('/utente', utentes);
app.use('/comentario', comentarios);


module.exports = app;