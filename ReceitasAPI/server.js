// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');

//database
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.database, {useMongoClient: true}); 
var User   = require('./app/models/pessoa'); // get our mongoose model

app.set('superSecret', config.secret);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use morgan to log requests to the console
app.use(morgan('dev'));

var port = process.env.PORT || 8080;        // set our port
app.set('superSecret', config.secret);

// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
var router = express.Router(); 
router.get('/', function(req, res) {
    res.json({ message: 'BENVINDO! GESTÃO RECEITAS!!!' });   
});
app.use('/home', router);

// ======= AUTENTICACAO ========
var autenticacoes=require('./routes/autent_route');

// ======= PESSOAS ==========
var pessoas = require('./routes/pessoa_route');
var receitas = require('./routes/receita_route');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /

app.use('/autenticacao', autenticacoes);
app.use('/pessoas', pessoas);
app.use('/receita', receitas);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
