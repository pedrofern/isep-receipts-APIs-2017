using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MedicamentosAPI.Migrations
{
    public partial class test3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "forma",
                table: "Apresentacao");

            migrationBuilder.AddColumn<string>(
                name: "forma_adm",
                table: "Apresentacao",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "forma_adm",
                table: "Apresentacao");

            migrationBuilder.AddColumn<string>(
                name: "forma",
                table: "Apresentacao",
                nullable: true);
        }
    }
}
