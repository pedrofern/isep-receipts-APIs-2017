using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class ApresentacaoDTO
    {
        public int ApresentacaoId { get; set; }
        public String forma { get; set; }
        public int dosagem { get; set; }
        public int quantidade { get; set; }
        public string farmaco { get; set; }
        public string medicamento { get; set; }
        public int dose { get; set; }
        public string via_administracao { get; set; }
        public int intervalo_tempo_horas { get; set; }
        public int periodo_tempo_dias { get; set; }
    }
}
