using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ToysStore.DTOs;
using ToysStore.Entities;

namespace ToysStore.Controllers
{
    [ApiController]
    [Route("api/branch")]
    public class branchController: ControllerBase
    {
        private readonly AplicationDbContext contex;
        private readonly IMapper mapper;

        public branchController(AplicationDbContext contex,
            IMapper mapper)
        {
            this.contex = contex;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BranchCreationDTO branchCreationDTO)
        {
            var branch = mapper.Map<Branch>(branchCreationDTO);
            contex.Add(branch);
            await contex.SaveChangesAsync();
            return NoContent();
        }
    }
}
