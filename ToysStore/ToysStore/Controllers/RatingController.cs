//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using ToysStore.DTOs;
//using ToysStore.Utils;

//namespace ToysStore.Controllers
//{
//    [Route("api/rating")]
//    [ApiController]
//    public class RatingController
//    {
//        private readonly UserManager<IdentityUser> userManager;
//        private readonly AplicationDbContext context;

//        public RatingController(UserManager<IdentityUser> userManager,
//            AplicationDbContext context)
//        {
//            this.userManager = userManager;
//            this.context = context;
//        }

//        [HttpPost]
//        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
//        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
//        {
//            var email = HttpContextExtensions.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
//            var user = await userManager.FindByEmailAsync(email);
//            var usuarioId = usuario.Id;

//            var ratingActual = await context.Ratings
//                .FirstOrDefaultAsync(x => x.PeliculaId == ratingDTO.PeliculaId
//                && x.UsuarioId == usuarioId);

//            if (ratingActual == null)
//            {
//                var rating = new Rating();
//                rating.PeliculaId = ratingDTO.PeliculaId;
//                rating.Puntuacion = ratingDTO.Puntuacion;
//                rating.UsuarioId = usuarioId;
//                context.Add(rating);
//            }
//            else
//            {
//                ratingActual.Puntuacion = ratingDTO.Puntuacion;
//            }

//            await context.SaveChangesAsync();
//            return NoContent();
//        }
//    }
//}
