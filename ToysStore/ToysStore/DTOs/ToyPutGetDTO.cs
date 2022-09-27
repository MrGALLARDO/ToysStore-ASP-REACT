namespace ToysStore.DTOs
{
    public class ToyPutGetDTO
    {
        public ToyDTO Toy { get; set; }
        public List<CategoryDTO> CategoriesSelected { get; set; }
        public List<CategoryDTO> CategoriesNotSelected { get; set; }
        public List<BranchDTO> BranchesSelected { get; set; }
        public List<BranchDTO> BranchesNotSelected { get; set; }
        public List<ToyBrandDTO> Brands { get; set; }
    }
}