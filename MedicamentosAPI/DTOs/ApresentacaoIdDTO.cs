using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class ApresentacaoIdDTO
    {
        public int id { get; set; }

        public ApresentacaoIdDTO(Apresentacao a)
        {
            id = a.ApresentacaoId;
        }
    }
}
