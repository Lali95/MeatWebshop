using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations.AppDb
{
    /// <inheritdoc />
    public partial class RefactorOrderItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "OrderSum",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "OrderItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderSum",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "OrderItems");
        }
    }
}
