import { Receita } from '../models/receita';

export const RECEITAS: Receita[] = [
  {  _id:"1",
  utente: "utenteTeste",
  medico: "medicoTeste",
  __v: "0", 
  local: "Vilalva",
  data:  new Date("2017-3-3"),

  prescricoes: [{
    quantidade: "12",
    fechada:true,
    validade:  new Date("2017-7-3"),
    apresentacao: {     
        id_apresentacao: 3,
        forma: "formaTeste",
        dosagem: "dosagemTeste",
        quantidade_embalagem:"quantidadeTeste",       
        farmaco: "farmaceuticoTeste",
        medicamento: "medicamentoTeste",       
        posologiaPrescrita: {
            dose: "dosePosologiaTeste",
            via_administracao: "viaAdminTeste",
            intervalo_tempo_horas: 3,
            periodo_tempo_dias: 7
        },            
    },   
    aviamentos: [{
        data_aviamento:   new Date("2017-5-3"),
        quantidade: 6,
        farmaceutico: "farmaceuticoTeste",
    }],     
  }]
 }];
