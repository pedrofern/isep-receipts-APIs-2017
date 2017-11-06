// receitas/models/pessoa.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PessoaSchema =  new Schema({
    id: Number,   
    email: String,
    password: String,
    nome: String,
    nif: Number,
    num_beneficiario: Number,
    medico: Boolean,
    utente: Boolean,
    farmaceutico: Boolean,
});

module.exports = mongoose.model('Pessoa', PessoaSchema);