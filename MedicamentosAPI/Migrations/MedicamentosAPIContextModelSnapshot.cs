﻿// <auto-generated />
using MedicamentosAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace MedicamentosAPI.Migrations
{
    [DbContext(typeof(MedicamentosAPIContext))]
    partial class MedicamentosAPIContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MedicamentosAPI.Models.Apresentacao", b =>
                {
                    b.Property<int>("ApresentacaoId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FarmacoId");

                    b.Property<int>("MedicamentoId");

                    b.Property<int>("Posologia_GenericaId");

                    b.Property<int>("dosagem");

                    b.Property<string>("forma_adm");

                    b.Property<int>("quantidade");

                    b.HasKey("ApresentacaoId");

                    b.HasIndex("FarmacoId");

                    b.HasIndex("MedicamentoId");

                    b.HasIndex("Posologia_GenericaId");

                    b.ToTable("Apresentacao");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Farmaco", b =>
                {
                    b.Property<int>("FarmacoId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("principio_ativo");

                    b.HasKey("FarmacoId");

                    b.ToTable("Farmaco");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Medicamento", b =>
                {
                    b.Property<int>("MedicamentoId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("laboratorio");

                    b.Property<string>("nome");

                    b.Property<int>("tamanho");

                    b.Property<DateTime>("validade");

                    b.HasKey("MedicamentoId");

                    b.ToTable("Medicamento");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Pessoa", b =>
                {
                    b.Property<int>("PessoaId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("nif");

                    b.Property<string>("nome");

                    b.Property<int>("num_beneficiario");

                    b.Property<int>("telefone");

                    b.HasKey("PessoaId");

                    b.ToTable("Pessoa");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Posologia", b =>
                {
                    b.Property<int>("PosologiaId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("dose");

                    b.Property<int>("intervalo_tempo_horas");

                    b.Property<int>("periodo_tempo_dias");

                    b.Property<string>("via_administracao");

                    b.HasKey("PosologiaId");

                    b.ToTable("Posologia");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Prescricao", b =>
                {
                    b.Property<int>("PrescricaoId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("MedicamentoId");

                    b.Property<int?>("ReceitaId");

                    b.HasKey("PrescricaoId");

                    b.HasIndex("MedicamentoId");

                    b.HasIndex("ReceitaId");

                    b.ToTable("Prescricao");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Receita", b =>
                {
                    b.Property<int>("ReceitaId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UtenteId");

                    b.Property<int>("codigo_acesso");

                    b.Property<DateTime>("data");

                    b.Property<string>("local");

                    b.Property<DateTime>("validade");

                    b.HasKey("ReceitaId");

                    b.HasIndex("UtenteId");

                    b.ToTable("Receita");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Apresentacao", b =>
                {
                    b.HasOne("MedicamentosAPI.Models.Farmaco", "Farmaco")
                        .WithMany("apresentacoes")
                        .HasForeignKey("FarmacoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MedicamentosAPI.Models.Medicamento", "Medicamento")
                        .WithMany("apresentacoes")
                        .HasForeignKey("MedicamentoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MedicamentosAPI.Models.Posologia", "Posologia_Generica")
                        .WithMany()
                        .HasForeignKey("Posologia_GenericaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Prescricao", b =>
                {
                    b.HasOne("MedicamentosAPI.Models.Medicamento")
                        .WithMany("prescricoes")
                        .HasForeignKey("MedicamentoId");

                    b.HasOne("MedicamentosAPI.Models.Receita")
                        .WithMany("prescricoes")
                        .HasForeignKey("ReceitaId");
                });

            modelBuilder.Entity("MedicamentosAPI.Models.Receita", b =>
                {
                    b.HasOne("MedicamentosAPI.Models.Pessoa", "Utente")
                        .WithMany()
                        .HasForeignKey("UtenteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
