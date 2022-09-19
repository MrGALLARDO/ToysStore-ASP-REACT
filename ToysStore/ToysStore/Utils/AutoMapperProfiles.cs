using AutoMapper;
using NetTopologySuite.Geometries;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Entities;

namespace ToysStore.Utils
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CategoryCreationDTO, Category>();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<BrandCreationDTO, Brand>()
                .ForMember(x => x.Image, options => options.Ignore());

            CreateMap<BranchCreationDTO, Branch>()
                .ForMember(x => x.ubication, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));
        }
    }
}
