using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToysStore.DTOs;
using ToysStore.Entities;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [ApiController]
    [Route("api/branch")]
    public class BranchController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public BranchController(ApplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<BranchDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Branches.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var branches = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<BranchDTO>>(branches);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<BranchDTO>> Get(int Id)
        {
            var branches = await context.Branches.FirstOrDefaultAsync(x => x.Id == Id);

            if (branches == null)
            {
                return NotFound();
            }

            return mapper.Map<BranchDTO>(branches);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BranchCreationDTO branchCreationDTO)
        {
            var branch = mapper.Map<Branch>(branchCreationDTO);
            context.Add(branch);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] BranchCreationDTO branchCreationDTO)
        {
            var branch = await context.Branches.FirstOrDefaultAsync(x => x.Id == Id);

            if (branch == null)
            {
                return NotFound();
            }

            branch = mapper.Map(branchCreationDTO, branch);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Branches.AnyAsync(x => x.Id == id);

            if (!exist)
            {
                return NotFound();
            }

            context.Remove(new Branch() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}