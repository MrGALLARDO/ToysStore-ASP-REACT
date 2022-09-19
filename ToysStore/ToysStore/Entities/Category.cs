using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using ToysStore.Entities;
using ToysStore.Validations;

namespace ToysStore.Controllers.Entities
{
    public class Category
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength:50)]
        [FirstCapitalLetter]
        public string Name { get; set; }

        public List<ToysCategories> ToysCategories { get; set; }
    }
}
