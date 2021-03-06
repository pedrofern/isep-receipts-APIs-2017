﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MedicamentosAPI.Models
{
    public class MedicamentosAPIContext : IdentityDbContext<UtilizadorEntidade>
    {
        public MedicamentosAPIContext (DbContextOptions<MedicamentosAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MedicamentosAPI.Models.Apresentacao> Apresentacao { get; set; }

        public DbSet<MedicamentosAPI.Models.Farmaco> Farmaco { get; set; }

        public DbSet<MedicamentosAPI.Models.Medicamento> Medicamento { get; set; }

        public DbSet<MedicamentosAPI.Models.Posologia> Posologia { get; set; }

        public DbSet<MedicamentosAPI.Models.Comentario> Comentario { get; set; }

    }
}
