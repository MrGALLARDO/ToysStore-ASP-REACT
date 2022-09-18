using System.ComponentModel.DataAnnotations;
using ToysStore.Validations;

namespace ToysStore.DTOs
{
    public class CategoryCreationDTO
    {

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }
    }
}
