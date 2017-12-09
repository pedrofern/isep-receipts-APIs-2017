// receitas/models/receita.js

var mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');

var ReceitaSchema = mongoose.Schema({   
    data: String,    
    local: String,
    medico: { type: mongoose.Schema.Types.ObjectId, ref:'Pessoa', required: true},
    utente: { type: mongoose.Schema.Types.ObjectId, ref:'Pessoa', required: true},
    prescricoes: [{
        quantidade: String,
        validade: Date,
        apresentacao: {     
            id_apresentacao: Number,
            forma: String,
            dosagem: String,
            quantidade_embalagem: String,       
            farmaco: String,
            medicamento: String,       
            posologia: {
                dose: String,
                via_administracao: String,
                intervalo_tempo_horas: Number,
                periodo_tempo_dias: Number
            },            
        },   
        aviamentos: [{
            data_aviamento: String,
            quantidade: Number,
            farmaceutico: { type: mongoose.Schema.Types.ObjectId, ref:'Pessoa', required: true},
        }],  
        fechada: Boolean
    }]
});

//ReceitaSchema.plugin(idvalidator);
module.exports = mongoose.model('Receita', ReceitaSchema);