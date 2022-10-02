using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToysStore.Migrations
{
    public partial class rating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_toysbranches_branches_BranchId",
                table: "toysbranches");

            migrationBuilder.DropForeignKey(
                name: "FK_toysbranches_toys_ToyId",
                table: "toysbranches");

            migrationBuilder.DropForeignKey(
                name: "FK_toysbrands_brands_BrandId",
                table: "toysbrands");

            migrationBuilder.DropForeignKey(
                name: "FK_toysbrands_toys_ToyId",
                table: "toysbrands");

            migrationBuilder.DropForeignKey(
                name: "FK_toyscategories_categories_CategoryId",
                table: "toyscategories");

            migrationBuilder.DropForeignKey(
                name: "FK_toyscategories_toys_ToyId",
                table: "toyscategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_toyscategories",
                table: "toyscategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_toysbrands",
                table: "toysbrands");

            migrationBuilder.DropPrimaryKey(
                name: "PK_toysbranches",
                table: "toysbranches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_toys",
                table: "toys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_categories",
                table: "categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_brands",
                table: "brands");

            migrationBuilder.DropPrimaryKey(
                name: "PK_branches",
                table: "branches");

            migrationBuilder.RenameTable(
                name: "toyscategories",
                newName: "Toyscategories");

            migrationBuilder.RenameTable(
                name: "toysbrands",
                newName: "Toysbrands");

            migrationBuilder.RenameTable(
                name: "toysbranches",
                newName: "Toysbranches");

            migrationBuilder.RenameTable(
                name: "toys",
                newName: "Toys");

            migrationBuilder.RenameTable(
                name: "categories",
                newName: "Categories");

            migrationBuilder.RenameTable(
                name: "brands",
                newName: "Brands");

            migrationBuilder.RenameTable(
                name: "branches",
                newName: "Branches");

            migrationBuilder.RenameIndex(
                name: "IX_toyscategories_CategoryId",
                table: "Toyscategories",
                newName: "IX_Toyscategories_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_toysbrands_ToyId",
                table: "Toysbrands",
                newName: "IX_Toysbrands_ToyId");

            migrationBuilder.RenameIndex(
                name: "IX_toysbranches_BranchId",
                table: "Toysbranches",
                newName: "IX_Toysbranches_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Toyscategories",
                table: "Toyscategories",
                columns: new[] { "ToyId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Toysbrands",
                table: "Toysbrands",
                columns: new[] { "BrandId", "ToyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Toysbranches",
                table: "Toysbranches",
                columns: new[] { "ToyId", "BranchId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Toys",
                table: "Toys",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brands",
                table: "Brands",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Branches",
                table: "Branches",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Punctuation = table.Column<int>(type: "int", nullable: false),
                    ToyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ratings_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalTable: "IdentityUser",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ratings_Toys_ToyId",
                        column: x => x.ToyId,
                        principalTable: "Toys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_ToyId",
                table: "Ratings",
                column: "ToyId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserId",
                table: "Ratings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Toysbranches_Branches_BranchId",
                table: "Toysbranches",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Toysbranches_Toys_ToyId",
                table: "Toysbranches",
                column: "ToyId",
                principalTable: "Toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Toysbrands_Brands_BrandId",
                table: "Toysbrands",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Toysbrands_Toys_ToyId",
                table: "Toysbrands",
                column: "ToyId",
                principalTable: "Toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Toyscategories_Categories_CategoryId",
                table: "Toyscategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Toyscategories_Toys_ToyId",
                table: "Toyscategories",
                column: "ToyId",
                principalTable: "Toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Toysbranches_Branches_BranchId",
                table: "Toysbranches");

            migrationBuilder.DropForeignKey(
                name: "FK_Toysbranches_Toys_ToyId",
                table: "Toysbranches");

            migrationBuilder.DropForeignKey(
                name: "FK_Toysbrands_Brands_BrandId",
                table: "Toysbrands");

            migrationBuilder.DropForeignKey(
                name: "FK_Toysbrands_Toys_ToyId",
                table: "Toysbrands");

            migrationBuilder.DropForeignKey(
                name: "FK_Toyscategories_Categories_CategoryId",
                table: "Toyscategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Toyscategories_Toys_ToyId",
                table: "Toyscategories");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "IdentityUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Toyscategories",
                table: "Toyscategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Toysbrands",
                table: "Toysbrands");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Toysbranches",
                table: "Toysbranches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Toys",
                table: "Toys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brands",
                table: "Brands");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Branches",
                table: "Branches");

            migrationBuilder.RenameTable(
                name: "Toyscategories",
                newName: "toyscategories");

            migrationBuilder.RenameTable(
                name: "Toysbrands",
                newName: "toysbrands");

            migrationBuilder.RenameTable(
                name: "Toysbranches",
                newName: "toysbranches");

            migrationBuilder.RenameTable(
                name: "Toys",
                newName: "toys");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "categories");

            migrationBuilder.RenameTable(
                name: "Brands",
                newName: "brands");

            migrationBuilder.RenameTable(
                name: "Branches",
                newName: "branches");

            migrationBuilder.RenameIndex(
                name: "IX_Toyscategories_CategoryId",
                table: "toyscategories",
                newName: "IX_toyscategories_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Toysbrands_ToyId",
                table: "toysbrands",
                newName: "IX_toysbrands_ToyId");

            migrationBuilder.RenameIndex(
                name: "IX_Toysbranches_BranchId",
                table: "toysbranches",
                newName: "IX_toysbranches_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_toyscategories",
                table: "toyscategories",
                columns: new[] { "ToyId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_toysbrands",
                table: "toysbrands",
                columns: new[] { "BrandId", "ToyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_toysbranches",
                table: "toysbranches",
                columns: new[] { "ToyId", "BranchId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_toys",
                table: "toys",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_categories",
                table: "categories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_brands",
                table: "brands",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_branches",
                table: "branches",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_toysbranches_branches_BranchId",
                table: "toysbranches",
                column: "BranchId",
                principalTable: "branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_toysbranches_toys_ToyId",
                table: "toysbranches",
                column: "ToyId",
                principalTable: "toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_toysbrands_brands_BrandId",
                table: "toysbrands",
                column: "BrandId",
                principalTable: "brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_toysbrands_toys_ToyId",
                table: "toysbrands",
                column: "ToyId",
                principalTable: "toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_toyscategories_categories_CategoryId",
                table: "toyscategories",
                column: "CategoryId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_toyscategories_toys_ToyId",
                table: "toyscategories",
                column: "ToyId",
                principalTable: "toys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
