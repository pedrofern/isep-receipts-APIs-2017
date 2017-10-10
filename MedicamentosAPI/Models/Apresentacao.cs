using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Apresentacao
    {
        public int ApresentacaoId { get; set; }
        public string forma_adm { get; set; }
        public int dosagem { get; set; }
        public int quantidade { get; set; }

        public int FarmacoId { get; set; }
        public Farmaco Farmaco { get; set; }

        public int MedicamentoId { get; set; }
        public Medicamento Medicamento { get; set; }

        public int Posologia_GenericaId { get; set; }
        public Posologia Posologia_Generica { get; set; }
    }
}
