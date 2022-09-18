using AutoMapper;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;

namespace ToysStore.Utils
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CategoryCreationDTO, Category>().ReverseMap();
        }
    }
}
