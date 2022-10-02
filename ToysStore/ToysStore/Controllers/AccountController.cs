//using AutoMapper;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using ToysStore.DTOs;
//using ToysStore.Utils;

//namespace ToysStore.Controllers
//{
//    [Route("api/account")]
//    [ApiController]
//    public class AccountController : ControllerBase
//    {
//        private readonly UserManager<IdentityUser> userManager;
//        private readonly SignInManager<IdentityUser> signInManager;
//        private readonly IConfiguration configuration;
//        private readonly AplicationDbContext context;
//        private readonly IMapper mapper;

//        public AccountController(UserManager<IdentityUser> userManager,
//            SignInManager<IdentityUser> signInManager,
//            IConfiguration configuration,
//            AplicationDbContext context,
//            IMapper mapper)
//        {
//            this.userManager = userManager;
//            this.signInManager = signInManager;
//            this.configuration = configuration;
//            this.context = context;
//            this.mapper = mapper;
//        }

//        [HttpGet("listUsers")]
//        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
//        public async Task<ActionResult<List<UserDTO>>> ListUsers([FromQuery] PaginationDTO paginationDTO)
//        {
//            var queryable = context.Users.AsQueryable();
//            await HttpContext.InsertParameterPaginationInHeader(queryable);
//            var usuarios = await queryable.OrderBy(x => x.Email).Paginate(PaginationDTO).ToListAsync();
//            return mapper.Map<List<UserDTO>>(usuarios);
//        }

//        [HttpPost("makeAdmin")]
//        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
//        public async Task<ActionResult> HacerAdmin([FromBody] string usuarioId)
//        {
//            var usuario = await userManager.FindByIdAsync(usuarioId);
//            await userManager.AddClaimAsync(usuario, new Claim("role", "admin"));
//            return NoContent();
//        }

//        [HttpPost("RemoverAdmin")]
//        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
//        public async Task<ActionResult> RemoverAdmin([FromBody] string usuarioId)
//        {
//            var usuario = await userManager.FindByIdAsync(usuarioId);
//            await userManager.RemoveClaimAsync(usuario, new Claim("role", "admin"));
//            return NoContent();
//        }

//        [HttpPost("crear")]
//        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] CredencialesUsuario credenciales)
//        {
//            var usuario = new IdentityUser { UserName = credenciales.Email, Email = credenciales.Email };
//            var resultado = await userManager.CreateAsync(usuario, credenciales.Password);

//            if (resultado.Succeeded)
//            {
//                return await ConstruirToken(credenciales);
//            }
//            else
//            {
//                return BadRequest(resultado.Errors);
//            }
//        }

//        [HttpPost("login")]
//        public async Task<ActionResult<RespuestaAutenticacion>> Login([FromBody] CredencialesUsuario credenciales)
//        {
//            var resultado = await signInManager.PasswordSignInAsync(credenciales.Email, credenciales.Password,
//                isPersistent: false, lockoutOnFailure: false);

//            if (resultado.Succeeded)
//            {
//                return await ConstruirToken(credenciales);
//            }
//            else
//            {
//                return BadRequest("Login incorrecto");
//            }
//        }

//        private async Task<RespuestaAutenticacion> ConstruirToken(CredencialesUsuario credenciales)
//        {
//            var claims = new List<Claim>()
//            {
//                new Claim("email", credenciales.Email)
//            };

//            var usuario = await userManager.FindByEmailAsync(credenciales.Email);
//            var claimsDB = await userManager.GetClaimsAsync(usuario);

//            claims.AddRange(claimsDB);

//            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
//            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

//            var expiracion = DateTime.UtcNow.AddYears(1);

//            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
//                expires: expiracion, signingCredentials: creds);

//            return new RespuestaAutenticacion()
//            {
//                Token = new JwtSecurityTokenHandler().WriteToken(token),
//                Expiracion = expiracion
//            };
//        }
//    }
//}
