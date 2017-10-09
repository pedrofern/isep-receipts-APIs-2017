using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Prescricao
    {
        public int PrescricaoId { get; set; }   

        public int ReceitaId { get; set; }
        public Receita Receita { get; set; }

        public int MedicamentoId { get; set; }
        public Medicamento Medicamento { get; set; }

        public int Posologia_PrescritaId { get; set; }
        public Posologia Posologia_Prescrita { get; set; }

        public int ApresentacaoId { get; set; }
        public Apresentacao Apresentacao { get; set; }        
    }
}
