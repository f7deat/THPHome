using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebUI.Models.Api.Admin;

namespace WebUI.Api
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly IPostService _postService;
        private readonly IPostCategoryService _postCategoryService;
        private readonly UserManager<IdentityUser> _userManager;
        public PostController(IPostService postService, IPostCategoryService postCategoryService, UserManager<IdentityUser> userManager)
        {
            _postService = postService;
            _postCategoryService = postCategoryService;
            _userManager = userManager;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync(int pageIndex, int pageSize, string searchTerm) => Ok(await _postService.GetListAsync(pageIndex, pageSize, searchTerm));

        [Route("get-in-category/{id}")]
        public async Task<IActionResult> GetInCategoryAsync(int id) => Ok(await _postService.GetInCategoryAsync(id));

        [HttpPost("export")]
        public async Task<IActionResult> ExportAsync() => File(await _postService.ExportAsync(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        [HttpPost("import")]
        public async Task<IActionResult> ImportAsync(IFormFile file) => Ok(await _postService.ImportAsync(file));

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody]PostParam post)
        {
            post.Post.CreatedBy = _userManager.GetUserId(User);
            post.Post.ModifiedBy = _userManager.GetUserId(User);
            var data = await _postService.AddAsync(post.Post);
            if (data.Id > 0)
            {
                await _postCategoryService.AddAsync(post.ListCategoryId, data.Id);
            }
            return CreatedAtAction(nameof(AddAsync), new { succeeded = true });
        }

        [HttpPost("set-status")]
        public async Task<IActionResult> SetStatusAsync(Post post) => Ok(await _postService.SetStatusAsync(post));

        [HttpPost("remove/{id}")]
        public async Task<IActionResult> RemoveAsync([FromRoute] long id) => Ok(await _postService.RemoveAsync(id));

        [Route("get/{id}")]
        public async Task<IActionResult> GetAsync([FromRoute] long id) => Ok(await _postService.FindAsync(id));

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody]PostParam post)
        {
            await _postCategoryService.DeleteAsync(post.Post.Id);
            await _postCategoryService.AddAsync(post.ListCategoryId, post.Post.Id);
            post.Post.ModifiedBy = _userManager.GetUserId(User);
            return Ok(await _postService.EditAsync(post.Post));
        }

        [Route("get-list-category-id-in-post/{postId}")]
        public async Task<IActionResult> GetListCategoryIdInPostAsync(long postId) => Ok(await _postCategoryService.GetListCategoryIdInPostAsync(postId));

        [Route("get-total")]
        public async Task<IActionResult> GetTotalAsync() => Ok(await _postService.GetTotalAsync());

        [Route("get-view")]
        public async Task<IActionResult> GetView() => Ok(await _postService.GetTotalViewAsync());

        [Route("get-count-in-user/{id}")]
        public async Task<IActionResult> GetCountInUserAsync([FromRoute] string id) => Ok(await _postService.GetCountInUserAsync(id));

        [Route("get-list-popular")]
        public async Task<IActionResult> GetListPopularAsync() => Ok(await _postService.GetListPopularAsync());

        [Route("get-list-in-user/{id}")]
        public async Task<IActionResult> GetListByUserAsync(string id) => Ok(await _postService.GetListByUserAsync(id));
    }
}
