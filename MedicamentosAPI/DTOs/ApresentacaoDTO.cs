using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicamentosAPI.Models;
using MedicamentosAPI.DTOs;

namespace MedicamentosAPI.DTOs
{
    public class ApresentacaoDTO
    {
        public int id { get; set; }
        public string forma_adm { get; set; }
        public string concentracao { get; set; }
        public string qtd { get; set; }
        public string farmaco { get; set; }
        public string medicamento { get; set; }
        public string dose { get; set; }
        public string via_administracao { get; set; }
        public string intervalo_tempo_horas { get; set; }
        public string periodo_tempo_dias { get; set; }

        public ApresentacaoDTO(Apresentacao a, Medicamento m, Farmaco f, Posologia p)
        {
            id=a.ApresentacaoId;
            forma_adm = a.forma_adm;
            concentracao=a.dosagem+"mg";
            qtd=a.quantidade+"ml";
            farmaco = f.principio_ativo;
            medicamento = m.nome;
            dose = p.dose.ToString();
            via_administracao = p.via_administracao;
            intervalo_tempo_horas = p.intervalo_tempo_horas.ToString();
            periodo_tempo_dias = p.periodo_tempo_dias.ToString();
        }
    }
}
