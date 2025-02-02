﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToysStore.DTOs;
using ToysStore.Entities;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [Route("api/rating")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext context;

        public RatingController(UserManager<IdentityUser> userManager,
            ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRating = await context.Ratings
                .FirstOrDefaultAsync(x => x.ToyId == ratingDTO.ToyId
                && x.UserId == userId);

            if (currentRating == null)
            {
                var rating = new Rating
                {
                    ToyId = ratingDTO.ToyId,
                    Punctuation = ratingDTO.Punctuation,
                    UserId = userId 
                };
                context.Add(rating);
            }
            else
            {
                currentRating.Punctuation = ratingDTO.Punctuation;
            }

            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
