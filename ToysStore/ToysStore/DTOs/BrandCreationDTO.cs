using System.ComponentModel.DataAnnotations;

namespace ToysStore.DTOs
{
    public class BrandCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

        [StringLength(maximumLength: 100)]
        public string Biography { get; set; }

        public IFormFile Image { get; set; }
    }
}