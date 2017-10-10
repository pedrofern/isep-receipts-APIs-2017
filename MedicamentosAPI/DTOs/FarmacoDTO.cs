using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class FarmacoDTO
    {
        public int id { get; set; }
        public string principio_ativo { get; set; }

        public FarmacoDTO(Farmaco f)
        {
            id=f.FarmacoId;
            principio_ativo= f.principio_ativo;
        }
    }
}
