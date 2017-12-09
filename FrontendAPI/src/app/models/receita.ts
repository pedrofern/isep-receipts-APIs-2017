export class Receita {
  _id: string;
  utente: string;
  medico: string;
  __v: string;
  local: string;
  data:  Date; 
  prescricoes: [{
    quantidade: string;

    validade: Date,
    apresentacao: {     
        id_apresentacao: Number,
        forma: String,
        dosagem: String,
        quantidade_embalagem: String,       
        farmaco: String,
        medicamento: String,       
        posologiaPrescrita: {
            dose: String,
            via_administracao: String,
            intervalo_tempo_horas: Number,
            periodo_tempo_dias: Number
        },            
    },   
    aviamentos: [{
        data_aviamento: Date,
        quantidade: Number,
        farmaceutico:string,
    }],     
  }]
 }

  