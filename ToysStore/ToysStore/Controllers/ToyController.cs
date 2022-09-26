using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [ApiController]
    [Route("api/toy")]
    public class ToyController : ControllerBase
    {
        private readonly AplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly string container = "toy";

        public ToyController(AplicationDbContext context,
           IMapper mapper,
           IStorageFiles storageFiles)
        {
            this.context = context;
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToyDTO>> Get(int id)
        {
            Toy toy = await context.toys
            .Include(x => x.ToysCategories).ThenInclude(x => x.category)
            .Include(x => x.ToysBrands).ThenInclude(x => x.Brand)
            .Include(x => x.ToysBranches).ThenInclude(x => x.Branch)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (toy == null) { return NotFound(); }

            var dto = mapper.Map<ToyDTO>(toy);
            dto.Brands = dto.Brands.OrderBy(x => x.Order).ToList();

            return dto;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ToyCreationDTO toyCreationDTO)
        {
            var toy = mapper.Map<Toy>(toyCreationDTO);

            if (toyCreationDTO.Image != null)
            {
                toy.Image = await storageFiles.SaveFile(container, toyCreationDTO.Image);
            }

            OrderBrands(toy);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<ToyPostGetDTO>> PostGet()
        {
            var branches = await context.branches.ToListAsync();
            var categories = await context.categories.ToListAsync();

            var branchDTO = mapper.Map<List<BranchDTO>>(branches);
            var categoryDTO = mapper.Map<List<CategoryDTO>>(categories);

            return new ToyPostGetDTO() { Branches = branchDTO, Categories = categoryDTO };
        }

        private void OrderBrands(Toy toy)
        {
            if (toy.ToysBrands != null)
            {
                int order = 0;
                toy.ToysBrands.ToList().ForEach(tb => tb.Order = (order++));
            }
        }
    }
}