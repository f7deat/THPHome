using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Authorize, Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private UserManager<IdentityUser> _userManager;
        public CategoryController(ICategoryService categoryService, UserManager<IdentityUser> userManager)
        {
            _categoryService = categoryService;
            _userManager = userManager;
        }

        [Route("get-list/{id}")]
        public async Task<IActionResult> GetListAsyc(int id) => Ok(await _categoryService.GetListAsyc(id));

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _categoryService.ListAllAsync());

        [Route("add"), HttpPost]
        public async Task<IActionResult> AddAsync([FromBody]Category category) => CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));

        [Route("delete/{id}"), HttpPost]
        public async Task<IActionResult> DeleteAsync([FromRoute]int id) => Ok(await _categoryService.DeleteAsync(id));

        [Route("update"), HttpPost]
        public async Task<IActionResult> UpdateAsync([FromBody] Category category) => Ok(await _categoryService.UpdateAsync(category));
    }
}
