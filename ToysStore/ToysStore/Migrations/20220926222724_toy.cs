using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToysStore.Migrations
{
    public partial class toy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ComingSoonDate",
                table: "toys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComingSoonDate",
                table: "toys");
        }
    }
}