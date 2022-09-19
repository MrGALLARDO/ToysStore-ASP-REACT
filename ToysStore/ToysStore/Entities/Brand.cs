using System.ComponentModel.DataAnnotations;

namespace ToysStore.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

        [StringLength(maximumLength: 100)]
        public string Biography { get; set; }

        public DateTime ReleaseYear { get; set; }

        public string Image { get; set; }

        public List<ToysBrands> ToysBrands { get; set; }
    }
}
