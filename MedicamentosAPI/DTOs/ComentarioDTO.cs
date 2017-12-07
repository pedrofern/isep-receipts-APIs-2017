using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.DTOs
{
    public class ComentarioDTO
    {
        public int id { get; set; }
        public int apresentacaoId { get; set; }
        public string nome_medico { get; set; }
        public string comentario_medico { get; set; }
        public DateTime data_comentario { get; set; }

        public ComentarioDTO(Comentario c)
        {
            id = c.ComentarioId;
            apresentacaoId = c.ApresentacaoId;
            nome_medico = c.nome_medico;
            comentario_medico = c.comentario_medico;
            data_comentario = c.data_comentario;
        }
    }
}
