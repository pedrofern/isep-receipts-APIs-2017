using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicamentosAPI.Models;
using MedicamentosAPI.DTOs;

namespace MedicamentosAPI.DTOs
{
    public class ApresentacaoDTO
    {
        public int id { get; set; }
        public string forma_adm { get; set; }
        public string concentracao { get; set; }
        public string qtd { get; set; }

        public ApresentacaoDTO(Apresentacao a)
        {
            id=a.ApresentacaoId;
            forma_adm = a.forma_adm;
            concentracao=a.dosagem+"mg";
            qtd=a.quantidade+"ml";

        }
    }
}
