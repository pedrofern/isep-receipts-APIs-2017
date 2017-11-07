using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicamentosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjetoTestes.DBTestClasses
{
    class TesteMedicamentosAPIContext : DbContext
        {

        public TesteMedicamentosAPIContext(DbContextOptions<TesteMedicamentosAPIContext> options)
         : base(options)
        {
           
        }

                 public DbSet<MedicamentosAPI.Models.Medicamento> Medicamento { get; set; }

                 public DbSet<MedicamentosAPI.Models.Apresentacao> Apresentacao { get; set; }

                 public DbSet<MedicamentosAPI.Models.Farmaco> Farmaco { get; set; }

                 public DbSet<MedicamentosAPI.Models.Posologia> Posologia { get; set; }

        }
    }