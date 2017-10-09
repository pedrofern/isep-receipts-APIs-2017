using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class PessoaDTO
    {
        public int PessoaId { get; set; }
        public String nome { get; set; }
        public int num_beneficiario { get; set; }
    }
}
