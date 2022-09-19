using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace ToysStore.Entities
{
    public class Branch
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 100)]
        public string Name { get; set; }
        public Point ubication { get; set; }
    }
}
