using ToysStore.Controllers.Entities;

namespace ToysStore.Entities
{
    public class ToysBrands
    {
        public int ToyId { get; set; }

        public int BrandId { get; set; }

        public Toy Toy { get; set; }

        public Brand Brand { get; set; }

        public string Website { get; set; }

        public int Order { get; set; }
    }
}
