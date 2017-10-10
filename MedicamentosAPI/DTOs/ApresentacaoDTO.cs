using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicamentosAPI.Models;

namespace MedicamentosAPI.DTOs
{
    public class ApresentacaoDTO
    {
        public int id { get; set; }
        public string forma { get; set; }
        public string concentracao { get; set; }
        public string qtd { get; set; }
        public string farmaco { get; set; }
        public string medicamento { get; set; }
        public int dose { get; set; }
        public string via_administracao { get; set; }
        public int intervalo_tempo_horas { get; set; }
        public int periodo_tempo_dias { get; set; }


        public ApresentacaoDTO(Apresentacao a)
        {
            id=a.ApresentacaoId;
            forma=a.forma;
            concentracao=a.dosagem+"mg";
            qtd=a.quantidade+"ml";

        }
    }
}
