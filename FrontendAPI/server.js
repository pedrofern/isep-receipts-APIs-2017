// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');

//database
var config = require('./config/config');
var mongoose = require('mongoose');
mongoose.connect(config.database, {useMongoClient: true}); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use morgan to log requests to the console
app.use(morgan('dev'));

app.set('superSecret', config.secret);

//

// ROUTES FOR OUR API
// =============================================================================
var teste   = require('./app/models/pessoa'); // get our mongoose model

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
var router = express.Router(); 
router.get('/', function(req, res) {
    res.json({ message: 'BENVINDO!!!' });   
});
app.use('/home', router);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
var pessoas=require('./routes/pessoa_route');
app.use('/pessoas', pessoas);

//----FRONTEND route --------------------------------
app.get('*', function(req,res){
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)   
});
module.exports = app;