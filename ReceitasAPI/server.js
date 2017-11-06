// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds149865.mlab.com:49865/arqsi2017', 
{useMongoClient: true}); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var Pessoa = require('./app/models/pessoa');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/pessoas')
    // create pessoa (accessed at POST http://localhost:8080/api/pessoas)
    .post(function(req, res) {
    
        var pessoa = new Pessoa();      // create a new instance of the Pessoa model
        
        pessoa.email = req.body.email;
        pessoa.password = req.body.password;
        pessoa.papel = req.body.papel;
        pessoa.nome = req.body.nome;
        pessoa.nif = req.body.nif;
        pessoa.num_beneficiario = req.body.num_beneficiario;

        // save the pessoa and check for errors
        pessoa.save(function(err) {
            if (err)
                res.send(err);

            res.json(pessoa);
        });

    })

    // get all pessoas (accessed at GET http://localhost:8080/api/pessoas)
    .get(function(req, res) {

        Pessoa.find(function(err, pessoas) {
            if (err)
                res.send(err);

            res.json(pessoas);
        });
    });

    // on routes that end in /pessoas/:pessoa_id
// ----------------------------------------------------
router.route('/pessoas/:pessoa_id')

    // get the pessoa with that id (accessed at GET http://localhost:8080/api/pessoas/:pessoa_id)
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
        




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


