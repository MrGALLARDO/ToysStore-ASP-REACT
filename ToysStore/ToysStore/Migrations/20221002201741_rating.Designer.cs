﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using ToysStore;

#nullable disable

namespace ToysStore.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20221002201741_rating")]
    partial class rating
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("IdentityUser");
                });

            modelBuilder.Entity("ToysStore.Controllers.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("ToysStore.Controllers.Entities.Toy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ComingSoonDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("InStock")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(5,2)");

                    b.Property<DateTime>("RegisterDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Review")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Toys");
                });

            modelBuilder.Entity("ToysStore.Entities.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<Point>("Ubication")
                        .HasColumnType("geography");

                    b.HasKey("Id");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("ToysStore.Entities.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Biography")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("ToysStore.Entities.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Punctuation")
                        .HasColumnType("int");

                    b.Property<int>("ToyId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("ToyId");

                    b.HasIndex("UserId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysBranches", b =>
                {
                    b.Property<int>("ToyId")
                        .HasColumnType("int");

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.HasKey("ToyId", "BranchId");

                    b.HasIndex("BranchId");

                    b.ToTable("Toysbranches");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysBrands", b =>
                {
                    b.Property<int>("BrandId")
                        .HasColumnType("int");

                    b.Property<int>("ToyId")
                        .HasColumnType("int");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.HasKey("BrandId", "ToyId");

                    b.HasIndex("ToyId");

                    b.ToTable("Toysbrands");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysCategories", b =>
                {
                    b.Property<int>("ToyId")
                        .HasColumnType("int");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.HasKey("ToyId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Toyscategories");
                });

            modelBuilder.Entity("ToysStore.Entities.Rating", b =>
                {
                    b.HasOne("ToysStore.Controllers.Entities.Toy", "Toy")
                        .WithMany()
                        .HasForeignKey("ToyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Toy");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysBranches", b =>
                {
                    b.HasOne("ToysStore.Entities.Branch", "Branch")
                        .WithMany("ToysBranches")
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ToysStore.Controllers.Entities.Toy", "Toy")
                        .WithMany("ToysBranches")
                        .HasForeignKey("ToyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");

                    b.Navigation("Toy");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysBrands", b =>
                {
                    b.HasOne("ToysStore.Entities.Brand", "Brand")
                        .WithMany("ToysBrands")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ToysStore.Controllers.Entities.Toy", "Toy")
                        .WithMany("ToysBrands")
                        .HasForeignKey("ToyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");

                    b.Navigation("Toy");
                });

            modelBuilder.Entity("ToysStore.Entities.ToysCategories", b =>
                {
                    b.HasOne("ToysStore.Controllers.Entities.Category", "Category")
                        .WithMany("ToysCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ToysStore.Controllers.Entities.Toy", "Toy")
                        .WithMany("ToysCategories")
                        .HasForeignKey("ToyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Toy");
                });

            modelBuilder.Entity("ToysStore.Controllers.Entities.Category", b =>
                {
                    b.Navigation("ToysCategories");
                });

            modelBuilder.Entity("ToysStore.Controllers.Entities.Toy", b =>
                {
                    b.Navigation("ToysBranches");

                    b.Navigation("ToysBrands");

                    b.Navigation("ToysCategories");
                });

            modelBuilder.Entity("ToysStore.Entities.Branch", b =>
                {
                    b.Navigation("ToysBranches");
                });

            modelBuilder.Entity("ToysStore.Entities.Brand", b =>
                {
                    b.Navigation("ToysBrands");
                });
#pragma warning restore 612, 618
        }
    }
}
