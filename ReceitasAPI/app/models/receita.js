// receitas/models/receita.js

var mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');

var ReceitaSchema = mongoose.Schema({   
    num_receita: Number,
    cod_acesso: Number, 
    data: { type: Date, default: Date.now},
    validade: Date,
    local: String,
    medico: { type: mongoose.Schema.Types.ObjectId, ref:'Pessoa', required: true},
    utente: { type: mongoose.Schema.Types.ObjectId, ref:'Pessoa', required: true},
    prescricoes: [{
        quantidade: Number,
        apresentacao: {     
            id_apresentacao: Number,
            forma: String,
            dosagem: String,
            quantidade_embalagem: String,       
            farmaco: String,
            medicamento: String,       
            posologia: [{
                dose: String,
                via_administracao: String,
                intervalo_tempo_horas: Number,
                periodo_tempo_dias: Number
            }],            
        },   
        aviamento: [{
            data_aviamento: Date,
            quantidade: Number,
            //farmaceutico: { type: Schema.Types.ObjectId, ref:'Pessoa', required: true},
        }]  
        
    }]
});

//ReceitaSchema.plugin(idvalidator);
module.exports = mongoose.model('Receita', ReceitaSchema);