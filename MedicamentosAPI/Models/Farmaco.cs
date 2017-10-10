using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Farmaco
    {
        public int FarmacoId { get; set; }
        public string principio_ativo { get; set; }

        public virtual ICollection<Apresentacao> apresentacoes { get; set; }  
    }
}
