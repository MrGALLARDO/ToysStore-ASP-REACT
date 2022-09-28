namespace ToysStore.DTOs
{
    public class ToyFilterDTO
    {
        public int Page { get; set; }
        public int RecordsPerPagine { get; set; }

        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPagine }; }
        }

        public string Name { get; set; }
        public int CategoryID { get; set; }
        public bool InStock { get; set; }
        public bool ComingSoonToys { get; set; }
    }
}