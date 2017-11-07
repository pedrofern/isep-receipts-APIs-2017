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


// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
var router = express.Router(); 
router.get('/', function(req, res) {
    res.json({ message: 'BENVINDO! GESTÃO RECEITAS!!!' });   
});
app.use('/home', router);

// ======= PESSOAS ==========
var pessoas = require('./routers/pessoa_router');
var receitas = require('./routers/receita_router');


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /

app.use('/pessoas', pessoas);
app.use('/receitas', receitas);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


