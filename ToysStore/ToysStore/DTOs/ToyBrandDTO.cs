using ToysStore.Controllers.Entities;
using ToysStore.Entities;

namespace ToysStore.DTOs
{
    public class ToyBrandDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Website { get; set; }
        public int Order { get; set; }
    }
}
