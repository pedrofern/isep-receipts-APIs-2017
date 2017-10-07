using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;

namespace MedicamentosAPI.Models
{
    public class MedicamentosAPIContext : DbContext
    {
        public MedicamentosAPIContext (DbContextOptions<MedicamentosAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MedicamentosAPI.Models.Apresentacao> Apresentacao { get; set; }

        public DbSet<MedicamentosAPI.Models.Farmaco> Farmaco { get; set; }

        public DbSet<MedicamentosAPI.Models.Medicamento> Medicamento { get; set; }

        public DbSet<MedicamentosAPI.Models.Pessoa> Pessoa { get; set; }

        public DbSet<MedicamentosAPI.Models.Posologia> Posologia { get; set; }

        public DbSet<MedicamentosAPI.Models.Prescricao> Prescricao { get; set; }

        public DbSet<MedicamentosAPI.Models.Receita> Receita { get; set; }
    }
}
