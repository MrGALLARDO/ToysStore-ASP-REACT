using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.Data;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [Route("api/category")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CategoryController : ControllerBase
    {

        private readonly ILogger<CategoryController> logger;
        private readonly AplicationDbContext context;
        private readonly IMapper mapper;

        public CategoryController(ILogger<CategoryController> logger,
            AplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.categories.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var categories = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<CategoryDTO>>(categories);
        }

        [HttpGet("{Id:int}/")]
        public async Task<ActionResult<Category>> Get(int Id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryCreationDTO categoryCreationDTO)
        {
            var category = mapper.Map<Category>(categoryCreationDTO);
            context.Add(category);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Category category)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            throw new NotImplementedException();
        }
    }
}
