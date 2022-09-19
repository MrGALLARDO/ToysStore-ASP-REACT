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
                .HasKey(x => new {x.BrandId,x.ToyId});

            modelBuilder.Entity<ToysCategories>()
             .HasKey(x => new { x.ToyId , x.CategoryId});

            modelBuilder.Entity<ToysBranches>()
             .HasKey(x => new { x.ToyId , x.BranchId});

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Category> categories { get; set; }
        public DbSet<Brand> brands { get; set; }

        public DbSet<Branch> branches { get; set; }

        public DbSet<Toy> toys { get; set; }

        public DbSet<ToysBrands> toysbrands { get; set; }

        public DbSet<ToysCategories> toyscategories { get; set; }

        public DbSet<ToysBranches> toysbranches { get; set; }
    }
}
