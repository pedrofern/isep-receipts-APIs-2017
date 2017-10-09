using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class MedicamentoDTO
    {
        public int MedicamentoId { get; set; }
        public string nome { get; set; }
        public string laboratorio { get; set; }
        public DateTime validade { get; set; }
        public int tamanho { get; set; }
    }
}
