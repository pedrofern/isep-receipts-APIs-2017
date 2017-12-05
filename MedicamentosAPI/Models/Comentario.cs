using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Comentario
    {
        public int ComentarioId { get; set; }

        public int ApresentacaoId { get; set; }
        public Apresentacao Apresentacao { get; set; }

        public string nome_medico { get; set; }
        public string comentario { get; set; }
        public DateTime data_comentario { get; set; }
    }
}
