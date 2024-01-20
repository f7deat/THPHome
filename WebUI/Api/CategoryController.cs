using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public CategoryController(ICategoryService categoryService, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : base(context)
        {
            _categoryService = categoryService;
            _userManager = userManager;
            _context = context;
        }

        [Route("get-list/{id}")]
        public async Task<IActionResult> GetListAsyc([FromRoute] int id, [FromQuery] Language language)
        {
            return Ok(await _categoryService.GetListAsyc(id, language));
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync([FromQuery] Language language)
        {
            return Ok(await _categoryService.ListAllAsync(language));
        }

        [Route("add"), HttpPost]
        public async Task<IActionResult> AddAsync([FromBody]Category category)
        {
            return CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));
        }

        [Route("delete/{id}"), HttpPost]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category is null) return BadRequest("Data not found!");
            return Ok(await _categoryService.DeleteAsync(id));
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Category category)
        {
            var data = await _context.Categories.FindAsync(category.Id);
            if (data is null) return BadRequest("Data not found!");
            data.IsDisplayOnHome = category.IsDisplayOnHome;
            data.Description = category.Description;
            data.Icon = category.Icon;
            data.Index = category.Index;
            data.Name = category.Name;
            data.ParrentId = category.ParrentId;
            data.NormalizeName = category.NormalizeName;
            data.Thumbnail = category.Thumbnail;
            return Ok(await _categoryService.UpdateAsync(data));
        }

        [HttpPost("active")]
        public async Task<IActionResult> ActiveAsync([FromBody] Category category)
        {
            var data = await _context.Categories.FindAsync(category.Id);
            if (data is null) return BadRequest("Data not found!");
            data.Status = category.Status;
            return Ok(await _categoryService.UpdateAsync(data));
        }
    }
}
