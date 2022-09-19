using AutoMapper;
using NetTopologySuite.Geometries;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Entities;

namespace ToysStore.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CategoryCreationDTO, Category>();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<BrandCreationDTO, Brand>()
                .ForMember(x => x.Image, options => options.Ignore());

            CreateMap<BranchCreationDTO, Branch>()
                .ForMember(x => x.Ubication, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<Branch, BranchDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(field => field.Ubication.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(field => field.Ubication.X));


            CreateMap<ToyCreationDTO, Toy>()
                .ForMember(x => x.Image, options => options.Ignore())
                .ForMember(x => x.ToysCategories, options => options.MapFrom(MappedToysCategories))
                .ForMember(x => x.ToysBranches, options => options.MapFrom(MappedToysBranches))
                .ForMember(x => x.ToysBrands, options => options.MapFrom(MappedToysBrands));

            //CreateMap<Toy, ToyDTO>()
            //   .ForMember(x => x.Categories, options => options.MapFrom(MapearPeliculasGeneros))
            //   .ForMember(x => x.Brands, options => options.MapFrom(MapearPeliculasActores))
            //   .ForMember(x => x.Branches, options => options.MapFrom(MapearPeliculasCines));

        }

        private List<ToysCategories> MappedToysCategories(ToyCreationDTO toyCreationDTO, Toy toy)
        {
            var result = new List<ToysCategories>();

            if (toyCreationDTO.CategoriesIds == null) { return result; }

            foreach (var id in toyCreationDTO.CategoriesIds)
            {
                result.Add(new ToysCategories()
                {
                    CategoryId = id,
                });
            }

            return result;
        }

        private List<ToysBranches> MappedToysBranches(ToyCreationDTO toyCreationDTO, Toy toy)
        {
            var result = new List<ToysBranches>();

            if (toyCreationDTO.BranchesIds == null) { return result; }

            foreach (var id in toyCreationDTO.BranchesIds)
            {
                result.Add(new ToysBranches()
                {
                    BranchId = id,
                });
            }

            return result;
        }

        private List<ToysBrands> MappedToysBrands(ToyCreationDTO toyCreationDTO, Toy toy)
        {
            var result = new List<ToysBrands>();

            if (toyCreationDTO.Brands == null) { return result; }

            foreach (var brand in toyCreationDTO.Brands)
            {
                result.Add(new ToysBrands()
                {
                    BrandId = brand.Id,
                    Website = brand.Website
                });
            }

            return result;
        }
    }
}
