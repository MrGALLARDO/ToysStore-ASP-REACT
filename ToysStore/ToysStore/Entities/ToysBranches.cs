using ToysStore.Controllers.Entities;

namespace ToysStore.Entities
{
    public class ToysBranches
    {
        public int ToyId { get; set; }

        public int BranchId { get; set; }

        public Toy Toy { get; set; }

        public Branch Branch { get; set; }
    }
}