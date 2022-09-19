namespace ToysStore.DTOs
{
    public class ToyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool InStock { get; set; }
        public DateTime registerDate { get; set; }
        public string Image { get; set; }
        public List<CategoryDTO> Categories { get; set; }
        public List<BrandDTO> Brands { get; set; }
        public List<BranchDTO> Branches { get; set; }
    }
}
