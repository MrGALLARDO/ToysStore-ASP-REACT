using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using ToysStore.Utils;

namespace ToysStore.DTOs
{
    public class ToyCreationDTO
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; }

        public bool InStock { get; set; }

        public DateTime comingSoonDate { get; set; }

        public DateTime RegisterDate { get; set; }

        [StringLength(maximumLength: 100)]
        public string? Review { get; set; }

        public IFormFile Image { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CategoriesIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> BranchesIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<BrandToyCreationDTO>>))]
        public List<BrandToyCreationDTO> Brands { get; set; }
    }
}