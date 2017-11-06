// receitas/models/receita.js


var mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');

var ReceitaSchema = mongoose.Schema({   
    num_receita: Number,
    cod_acesso: Number, 
    data: Date,
    validade: Date,
    local: String,
    medico: { type: Schema.Types.ObjectId, ref:'Pessoa', required: true},
    utente: { type: Schema.Types.ObjectId, ref:'Pessoa', required: true},
    prescricoes: [{
        quantidade: Number,
        // falta info da aplicação dos medicamentos. Ex: farmaco
        aviamento: [{
            data_aviamento: Date,
            quantidade: Number,
            farmaceutico: { type: Schema.Types.ObjectId, ref:'Pessoa', required: true},
        }]
    }]
});

ReceitaSchema.plugin(idvalidator);
module.exports = mongoose.model('Receita', ReceitaSchema);