using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Entities;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [Route("api/brand")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly AplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly string container = "brands";

        public BrandController(AplicationDbContext context
            , IMapper mapper, IStorageFiles storageFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet]
        public async Task<ActionResult<List<BrandDTO>>> Get([FromQuery] PaginationDTO paginationDTO )
        {
            var queryable = context.brands.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var brands = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<BrandDTO>>(brands);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BrandDTO>> Get(int id)
        {
            var brand = await context.brands.FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null)
            {
                return NotFound();
            }

            return mapper.Map<BrandDTO>(brand);
        }

        [HttpGet("findByName/{name}")]
        public async Task<List<ToyBrandDTO>> findByName(string name = "")
        {
            if (string.IsNullOrEmpty(name)) { return new List<ToyBrandDTO>(); }

            return await context.brands
                .Where(x => x.Name.Contains(name))
                .OrderBy(x => x.Name)
                .Select(x => new ToyBrandDTO { Id = x.Id, Name = x.Name , Image = x.Image})
                .Take(5)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] BrandCreationDTO brandCreationDTO)
        {
            var brand = mapper.Map<Brand>(brandCreationDTO);
            
            if(brandCreationDTO.Image != null)
            {
                brand.Image = await storageFiles.SaveFile(container, brandCreationDTO.Image);
            } 

            context.Add(brand);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] BrandCreationDTO brandCreationDTO)
        {
            var brand = await context.brands.FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null)
            {
                return NotFound();
            }

            brand = mapper.Map(brandCreationDTO, brand);

            if(brandCreationDTO.Image != null)
            {
                brand.Image = await storageFiles.EditFile(container, brandCreationDTO.Image, brand.Image);
            }
        
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var brand = await context.brands.FirstOrDefaultAsync(x=> x.Id == id);

            if(brand == null)
            {
                return NotFound();
            }

            context.Remove(brand);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(brand.Image, container);
            return NoContent();
        }
    }
}
