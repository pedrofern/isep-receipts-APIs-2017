// receitas/models/pessoa.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PessoaSchema =  new Schema({   
    email: String,
    password: String,
    papel: [
        'Medico',
        'Utente',
        'Farmaceutico'],
    nome: String,
    nif: Number,
    num_beneficiario: Number,
});

module.exports = mongoose.model('Pessoa', PessoaSchema);