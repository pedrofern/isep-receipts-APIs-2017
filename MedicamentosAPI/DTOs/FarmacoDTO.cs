using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class FarmacoDTO
    {
        public int FarmacoId { get; set; }
        public String principio_ativo { get; set; }

        public FarmacoDTO(FarmacoDTO f)
        {

        }
    }
}
