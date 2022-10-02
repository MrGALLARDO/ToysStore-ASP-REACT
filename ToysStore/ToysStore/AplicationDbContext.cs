using Microsoft.EntityFrameworkCore;
using ToysStore.Controllers.Entities;
using ToysStore.Entities;

namespace ToysStore
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToysBrands>()
                .HasKey(x => new { x.BrandId, x.ToyId });

            modelBuilder.Entity<ToysCategories>()
             .HasKey(x => new { x.ToyId, x.CategoryId });

            modelBuilder.Entity<ToysBranches>()
             .HasKey(x => new { x.ToyId, x.BranchId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }

        public DbSet<Branch> Branches { get; set; }

        public DbSet<Toy> Toys { get; set; }

        public DbSet<ToysBrands> Toysbrands { get; set; }

        public DbSet<ToysCategories> Toyscategories { get; set; }

        public DbSet<ToysBranches> Toysbranches { get; set; }
    }
}