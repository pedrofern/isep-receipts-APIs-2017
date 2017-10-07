using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Posologia
    {
        public int PosologiaId { get; set; }
        public int dose { get; set; }
        public String via_administracao { get; set; }
        public int intervalo_tempo_horas { get; set; }
        public int periodo_tempo_dias { get; set; }
    }
}
