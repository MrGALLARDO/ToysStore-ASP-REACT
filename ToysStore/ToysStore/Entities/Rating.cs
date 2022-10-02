using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using ToysStore.Controllers.Entities;

namespace ToysStore.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Punctuation { get; set; }
        public int ToyId { get; set; }
        public Toy Toy { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}
