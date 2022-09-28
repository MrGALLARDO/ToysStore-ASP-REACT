using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ToysStore.Entities;

namespace ToysStore.Controllers.Entities
{
    public class Toy
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; } = string.Empty;

        public bool InStock { get; set; }

        [Required()]
        [Range(0, 1000.00)]
        [Column(TypeName = "decimal(5,2)")]
        public decimal Price { get; set; }

        public DateTime ComingSoonDate { get; set; }

        public DateTime RegisterDate { get; set; } = DateTime.Now;

        [StringLength(maximumLength: 50)]
        public string Review { get; set; }

        public string Image { get; set; }

        public List<ToysBrands> ToysBrands { get; set; }

        public List<ToysCategories> ToysCategories { get; set; }

        public List<ToysBranches> ToysBranches { get; set; }
    }
}