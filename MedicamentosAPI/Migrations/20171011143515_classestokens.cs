using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MedicamentosAPI.Migrations
{
    public partial class classestokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prescricao");

            migrationBuilder.DropTable(
                name: "Receita");

            migrationBuilder.DropTable(
                name: "Pessoa");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoa",
                columns: table => new
                {
                    PessoaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    nif = table.Column<int>(nullable: false),
                    nome = table.Column<string>(nullable: true),
                    num_beneficiario = table.Column<int>(nullable: false),
                    telefone = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoa", x => x.PessoaId);
                });

            migrationBuilder.CreateTable(
                name: "Receita",
                columns: table => new
                {
                    ReceitaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UtenteId = table.Column<int>(nullable: false),
                    codigo_acesso = table.Column<int>(nullable: false),
                    data = table.Column<DateTime>(nullable: false),
                    local = table.Column<string>(nullable: true),
                    validade = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receita", x => x.ReceitaId);
                    table.ForeignKey(
                        name: "FK_Receita_Pessoa_UtenteId",
                        column: x => x.UtenteId,
                        principalTable: "Pessoa",
                        principalColumn: "PessoaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prescricao",
                columns: table => new
                {
                    PrescricaoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MedicamentoId = table.Column<int>(nullable: true),
                    ReceitaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescricao", x => x.PrescricaoId);
                    table.ForeignKey(
                        name: "FK_Prescricao_Medicamento_MedicamentoId",
                        column: x => x.MedicamentoId,
                        principalTable: "Medicamento",
                        principalColumn: "MedicamentoId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prescricao_Receita_ReceitaId",
                        column: x => x.ReceitaId,
                        principalTable: "Receita",
                        principalColumn: "ReceitaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prescricao_MedicamentoId",
                table: "Prescricao",
                column: "MedicamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescricao_ReceitaId",
                table: "Prescricao",
                column: "ReceitaId");

            migrationBuilder.CreateIndex(
                name: "IX_Receita_UtenteId",
                table: "Receita",
                column: "UtenteId");
        }
    }
}
