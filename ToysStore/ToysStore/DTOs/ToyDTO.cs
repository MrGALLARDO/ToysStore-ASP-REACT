namespace ToysStore.DTOs
{
    public class ToyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public DateTime ComingSoonDate { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Review { get; set; }
        public string Image { get; set; }
        public List<CategoryDTO> Categories { get; set; }
        public List<ToyBrandDTO> Brands { get; set; }
        public List<BranchDTO> Branches { get; set; }
        public int UserVote { get; set; }
        public double AverageVote { get; set; }

    }
}