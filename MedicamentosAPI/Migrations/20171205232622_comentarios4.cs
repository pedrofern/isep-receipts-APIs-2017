using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MedicamentosAPI.Migrations
{
    public partial class comentarios4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comentario",
                table: "Comentario");

            migrationBuilder.AddColumn<string>(
                name: "comentario_medico",
                table: "Comentario",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comentario_medico",
                table: "Comentario");

            migrationBuilder.AddColumn<string>(
                name: "comentario",
                table: "Comentario",
                nullable: true);
        }
    }
}
