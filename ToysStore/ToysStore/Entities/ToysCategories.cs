using ToysStore.Controllers.Entities;
using ToysStore.Entities;

namespace ToysStore.Entities
{
    public class ToysCategories
    {
        public int ToyId { get; set; }
        public int CategoryId { get; set; }

        public Toy Toy { get; set; }

        public Category category { get; set; }
    }
}
