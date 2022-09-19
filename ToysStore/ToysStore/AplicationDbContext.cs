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

        public DbSet<Category> categories { get; set; }
        public DbSet<Brand> brands { get; set; }

        public DbSet<Branch> branches { get; set; }
    }
}
