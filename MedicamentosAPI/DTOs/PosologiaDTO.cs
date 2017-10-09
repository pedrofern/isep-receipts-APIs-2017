using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class PosologiaDTO
    {
        public int PosologiaId { get; set; }
        public int dose { get; set; }
        public string via_administracao { get; set; }
        public int intervalo_tempo_horas { get; set; }
        public int periodo_tempo_dias { get; set; }
    }
}
