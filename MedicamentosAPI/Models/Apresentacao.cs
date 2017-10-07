using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Apresentacao
    {
        public int ApresentacaoId { get; set; }
        public String forma { get; set; }
        public int dosagem { get; set; }
        public int quantidade { get; set; }
    }
}
