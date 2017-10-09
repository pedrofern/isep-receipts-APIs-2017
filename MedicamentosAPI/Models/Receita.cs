using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Models
{
    public class Receita
    {
        public int ReceitaId { get; set; }
        public DateTime data { get; set; }
        public DateTime validade { get; set; }
        public string local { get; set; }
        public int codigo_acesso { get; set; }

        public int UtenteId { get; set; }
        public Pessoa Utente { get; set; }

        public int MedicoId { get; set; }
        public Pessoa Medico { get; set; }

        public virtual ICollection<Prescricao> prescricoes { get; set; }
    }
}
