using ToysStore.DTOs;

namespace PeliculasAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<ToyDTO> InStock { get; set; }
        public List<ToyDTO> ComingSoonToys { get; set; }
    }
}