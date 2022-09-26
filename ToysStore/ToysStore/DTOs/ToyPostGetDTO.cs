namespace ToysStore.DTOs
{
    public class ToyPostGetDTO
    {
        public List<CategoryDTO> Categories { get; set; }
        public List<BranchDTO> Branches { get; set; }
    }
}