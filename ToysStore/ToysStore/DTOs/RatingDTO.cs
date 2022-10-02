using System.ComponentModel.DataAnnotations;

namespace ToysStore.DTOs
{
    public class RatingDTO
    {
        public int ToyId { get; set; }
        [Range(1, 5)]
        public int Punctuation { get; set; }
    }
}
