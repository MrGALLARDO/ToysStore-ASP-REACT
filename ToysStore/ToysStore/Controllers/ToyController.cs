using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
            this.mapper = mapper;
            this.storageFiles = storageFiles;
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

        private void OrderBrands(Toy toy)
        {
            if(toy.ToysBrands != null)
            {
                for (int i = 0 ; i < toy.ToysBrands.Count; i++)
                {
                    toy.ToysBrands[i].Order = i;
                }
            }
        }

    }

}
