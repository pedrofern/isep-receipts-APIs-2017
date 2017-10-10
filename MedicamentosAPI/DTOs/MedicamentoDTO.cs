using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class MedicamentoDTO
    {
        public int id { get; set; }
        public string nome { get; set; }

        public MedicamentoDTO(Medicamento m)
        {
            id = m.MedicamentoId;
            nome = m.nome;
        }
    }
}
