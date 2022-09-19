using System.ComponentModel.DataAnnotations;
using ToysStore.Entities;

namespace ToysStore.Controllers.Entities
{
    public class Toy
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; }

        public bool InStock { get; set; }

        public DateTime registerDate { get; set; }

        public string Image { get; set; }


        public List<ToysBrands> ToysBrands { get; set; }

        public List<ToysCategories> ToysCategories { get; set; }
        public List<ToysBranches> ToysBranches { get; set; }

    }
}
