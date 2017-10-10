using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class PosologiaIdDTO
    {
        public int id { get; set; }

        public PosologiaIdDTO(Posologia p)
        {
            id = p.PosologiaId;
        }
    }
}
