using Microsoft.EntityFrameworkCore;
using ToysStore.Controllers.Entities;

namespace ToysStore
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> categories { get; set; }
    }
}
