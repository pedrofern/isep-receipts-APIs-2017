using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class MedicamentoIdDTO
    {
        public int id { get; set; }

        public MedicamentoIdDTO(int id)
        {
            this.id = id;
        }
    }
}
