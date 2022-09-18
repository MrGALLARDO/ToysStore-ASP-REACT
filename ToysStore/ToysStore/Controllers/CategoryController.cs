using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Data;
using ToysStore.Controllers.Entities;

namespace ToysStore.Controllers
{
    [Route("api/category")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CategoryController : ControllerBase
    {

        private readonly ILogger<CategoryController> logger;

        public CategoryController(ILogger<CategoryController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public ActionResult<List<Category>> Get()
        {
            return new List<Category>() { new Category() { Id = 1, Name = "RobertoG" } };
        }

        [HttpGet("{Id:int}/")]
        public async Task<ActionResult<Category>> Get(int Id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public ActionResult Post([FromBody] Category category)
        {
            throw new NotImplementedException();
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
