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
                .ForMember(x => x.Ubication, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<Branch, BranchDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(field => field.Ubication.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(field => field.Ubication.X));

            //CreateMap<ToyCreationDTO, Toy>()
            //    .ForMember(x => x.Image, options => options.Ignore())
            //    .ForMember(x => x.ToysCategories, options => options.MapFrom(MapearPeliculasGeneros))
            //    .ForMember(x => x.ToysBranches, options => options.MapFrom(MapearPeliculasCines))
            //    .ForMember(x => x.ToysBrands, options => options.MapFrom(MapearPeliculasActores));

            //CreateMap<Toy, ToyDTO>()
            //   .ForMember(x => x.Categories, options => options.MapFrom(MapearPeliculasGeneros))
            //   .ForMember(x => x.Brands, options => options.MapFrom(MapearPeliculasActores))
            //   .ForMember(x => x.Branches, options => options.MapFrom(MapearPeliculasCines));

        }

        //private List<BranchDTO> MapearPeliculasCines(Toy toy, ToyDTO toyDTO)
        //{
        //    var resultado = new List<BranchDTO>();

        //    if (toy.ToysBranches != null)
        //    {
        //        foreach (var toysBranches in toy.ToysBranches)
        //        {
        //            resultado.Add(new BranchDTO()
        //            {
        //                Id = toysBranches.Branch.Id,
        //                Name = toysBranches.Branch.Name,
        //                Latitude = toysBranches.Branch.Ubication.Y,
        //                Longitude = toysBranches.Branch.Ubication.X
        //            });
        //        }
        //    }

        //    return resultado;
        //}

        //private List<ToysBrands> MapearPeliculasActores(Toy toy, ToyDTO toyDTO)
        //{
        //    var result = new List<ToyBrandDTO>();

        //    if (toy.ToysBrands != null)
        //    {
        //        foreach (var toysBrands in toy.ToysBrands)
        //        {
        //            result.Add(new ToyBrandDTO()
        //            {
        //                Id = toysBrands.BrandId,
        //                Name = toysBrands.Brand.Name,
        //                Image = toysBrands.Brand.Image,
        //                Order = toysBrands.Order,
        //                Website = toysBrands.Website
        //            });
        //        }
        //    }

        //    return result;
        //}

        //private List<GeneroDTO> MapearPeliculasGeneros(Pelicula pelicula, PeliculaDTO peliculaDTO)
        //{
        //    var resultado = new List<GeneroDTO>();

        //    if (pelicula.PeliculasGeneros != null)
        //    {
        //        foreach (var genero in pelicula.PeliculasGeneros)
        //        {
        //            resultado.Add(new GeneroDTO() { Id = genero.GeneroId, Nombre = genero.Genero.Nombre });
        //        }
        //    }

        //    return resultado;
        //}

        //private List<PeliculasActores> MapearPeliculasActores(PeliculaCreacionDTO peliculaCreacionDTO,
        //   Pelicula pelicula)
        //{
        //    var resultado = new List<PeliculasActores>();

        //    if (peliculaCreacionDTO.Actores == null) { return resultado; }

        //    foreach (var actor in peliculaCreacionDTO.Actores)
        //    {
        //        resultado.Add(new PeliculasActores() { ActorId = actor.Id, Personaje = actor.Personaje });
        //    }

        //    return resultado;
        //}

        //private List<PeliculasGeneros> MapearPeliculasGeneros(PeliculaCreacionDTO peliculaCreacionDTO,
        //    Pelicula pelicula)
        //{
        //    var resultado = new List<PeliculasGeneros>();

        //    if (peliculaCreacionDTO.GenerosIds == null) { return resultado; }

        //    foreach (var id in peliculaCreacionDTO.GenerosIds)
        //    {
        //        resultado.Add(new PeliculasGeneros() { GeneroId = id });
        //    }

        //    return resultado;
        //}

        //private List<PeliculasCines> MapearPeliculasCines(PeliculaCreacionDTO peliculaCreacionDTO,
        //   Pelicula pelicula)
        //{
        //    var resultado = new List<PeliculasCines>();

        //    if (peliculaCreacionDTO.CinesIds == null) { return resultado; }

        //    foreach (var id in peliculaCreacionDTO.CinesIds)
        //    {
        //        resultado.Add(new PeliculasCines() { CineId = id });
        //    }

        //    return resultado;
        //}
    }
}
