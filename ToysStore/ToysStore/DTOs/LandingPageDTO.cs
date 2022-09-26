using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToysStore.DTOs;

namespace PeliculasAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<ToyDTO> inStock { get; set; }
        public List<ToyDTO> nextToys { get; set; }
    }
}
