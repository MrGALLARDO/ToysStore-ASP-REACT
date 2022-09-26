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
    public class branchController : ControllerBase
    {
        private readonly AplicationDbContext context;
        private readonly IMapper mapper;

        public branchController(AplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<BranchDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.branches.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var branches = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<BranchDTO>>(branches);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<BranchDTO>> Get(int Id)
        {
            var branches = await context.branches.FirstOrDefaultAsync(x => x.Id == Id);

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
        public async Task<ActionResult> Put(int id, [FromBody] BranchCreationDTO branchCreationDTO)
        {
            var branch = await context.branches.FirstOrDefaultAsync(x => x.Id == id);

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
            var exist = await context.branches.AnyAsync(x => x.Id == id);

            if (!exist)
            {
                return NotFound();
            }

            context.Remove(new Branch() { Id = id });
            return NoContent();
        }
    }
}