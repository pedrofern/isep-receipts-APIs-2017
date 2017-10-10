using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class PosologiaDTO
    {
        public int id { get; set; }
        public int dose { get; set; }
        public string via_administracao { get; set; }
        public int intervalo_tempo_horas { get; set; }
        public int periodo_tempo_dias { get; set; }

        public PosologiaDTO(Posologia p)
        {
            id = p.PosologiaId;
            dose = p.dose;
            via_administracao = p.via_administracao;
            intervalo_tempo_horas = p.intervalo_tempo_horas;
            periodo_tempo_dias = p.periodo_tempo_dias;
        }
    }
}
