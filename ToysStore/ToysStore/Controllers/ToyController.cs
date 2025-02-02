﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using ToysStore.Controllers.Entities;
using ToysStore.DTOs;
using ToysStore.Utils;

namespace ToysStore.Controllers
{
    [ApiController]
    [Route("api/toy")]
    public class ToyController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly string container = "toys";

        public ToyController(ApplicationDbContext context,
           IMapper mapper,
           IStorageFiles storageFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var now = DateTime.Today;

            var comingSoonToys = await context.Toys
                .Where(x => x.ComingSoonDate > now)
                .OrderBy(x => x.ComingSoonDate)
                .Take(top)
                .ToListAsync();

            var inStock = await context.Toys
                .Where(x => x.InStock)
                .OrderBy(x => x.ComingSoonDate)
                .Take(top)
                .ToListAsync();

            var result = new LandingPageDTO
            {
                ComingSoonToys = mapper.Map<List<ToyDTO>>(comingSoonToys),

                InStock = mapper.Map<List<ToyDTO>>(inStock)
            };

            return result;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToyDTO>> Get(int id)
        {
            Toy toy = await context.Toys
            .Include(x => x.ToysCategories).ThenInclude(x => x.Category)
            .Include(x => x.ToysBrands).ThenInclude(x => x.Brand)
            .Include(x => x.ToysBranches).ThenInclude(x => x.Branch)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (toy == null) { return NotFound(); }

            var dto = mapper.Map<ToyDTO>(toy);
            dto.Brands = dto.Brands.OrderBy(x => x.Order).ToList();

            return dto;
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<ToyDTO>>> Filter([FromQuery] ToyFilterDTO toyFilterDTO)
        {
            var toysQueryable = context.Toys.AsQueryable();

            if (!string.IsNullOrEmpty(toyFilterDTO.Name))
            {
                toysQueryable = toysQueryable.Where(x => x.Name.Contains(toyFilterDTO.Name));
            }

            if (toyFilterDTO.InStock)
            {
                toysQueryable = toysQueryable.Where(x => x.InStock);
            }

            if (toyFilterDTO.ComingSoonToys)
            {
                var now = DateTime.Today;
                toysQueryable = toysQueryable.Where(x => x.ComingSoonDate > now);
            }

            if (toyFilterDTO.CategoryID != 0)
            {
                toysQueryable = toysQueryable
                    .Where(x => x.ToysCategories.Select(y => y.CategoryId)
                    .Contains(toyFilterDTO.CategoryID));
            }

            await HttpContext.InsertParameterPaginationInHeader(toysQueryable);

            var toys = await toysQueryable.Paginate(toyFilterDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<ToyDTO>>(toys);
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<ToyPostGetDTO>> PostGet()
        {
            var branches = await context.Branches.ToListAsync();
            var categories = await context.Categories.ToListAsync();

            var branchDTO = mapper.Map<List<BranchDTO>>(branches);
            var categoryDTO = mapper.Map<List<CategoryDTO>>(categories);

            return new ToyPostGetDTO() { Branches = branchDTO, Categories = categoryDTO };
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] ToyCreationDTO toyCreationDTO)
        {
            var toy = mapper.Map<Toy>(toyCreationDTO);

            if (toyCreationDTO.Image != null)
            {
                toy.Image = await storageFiles.SaveFile(container, toyCreationDTO.Image);
            }

            OrderBrands(toy);

            context.Add(toy);
            try
            {
                await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return toy.Id;
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<ToyPutGetDTO>> PutGet(int id)
        {
            var toyActionResult = await Get(id);
            if (toyActionResult.Result is NotFoundResult) { return NotFound(); }

            var toy = toyActionResult.Value;

            var categoriesSelectedIds = toy.Categories.Select(x => x.Id).ToList();
            var categoriesNotSelected = await context.Categories
                .Where(x => !categoriesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var branchesSelectedIds = toy.Branches.Select(x => x.Id).ToList();
            var branchesNotSelected = await context.Branches
                .Where(x => !branchesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var categoriesNotSelectedDTO = mapper.Map<List<CategoryDTO>>(categoriesNotSelected);
            var branchesNotSelectedDTO = mapper.Map<List<BranchDTO>>(branchesNotSelected);

            var answer = new ToyPutGetDTO
            {
                Toy = toy,
                CategoriesSelected = toy.Categories,
                CategoriesNotSelected = categoriesNotSelectedDTO,
                BranchesSelected = toy.Branches,
                BranchesNotSelected = branchesNotSelectedDTO,
                Brands = toy.Brands
            };
            return answer;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ToyCreationDTO toyCreationDTO)
        {
            var toy = await context.Toys
                .Include(x => x.ToysBrands)
                .Include(x => x.ToysCategories)
                .Include(x => x.ToysBranches)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (toy == null)
            {
                return NotFound();
            }

            toy = mapper.Map(toyCreationDTO, toy);

            if (toyCreationDTO.Image != null)
            {
                toy.Image = await storageFiles.EditFile(container, toyCreationDTO.Image, toy.Image);
            }

            OrderBrands(toy);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var toy = await context.Toys.FirstOrDefaultAsync(x => x.Id == id);

            if (toy == null)
            {
                return NotFound();
            }

            context.Remove(toy);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(toy.Image, container);

            return NoContent();
        }

        private static void OrderBrands(Toy toy)
        {
            if (toy.ToysBrands != null)
            {
                int order = 0;
                toy.ToysBrands.ToList().ForEach(tb => tb.Order = (order++));
            }
        }
    }
}