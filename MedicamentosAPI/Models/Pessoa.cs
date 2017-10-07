using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Pessoa
    {
        public int PessoaId { get; set; }
        public String nome { get; set; }
        public int nif { get; set; }
        public int telefone { get; set; }
        public int num_beneficiario { get; set; }
    }
}
